import Account from "../models/AccountModel.js";
import Data_diri from "../models/DataDiriModel.js";
import Pendidikan from "../models/PendidikanModel.js";
import Organisasi from "../models/OrganisasiModel.js";
import Skill from "../models/SkillModel.js";
import Portofolio from "../models/PortofolioModel.js";
import Galeri from "../models/GaleriModel.js";
import path from "path";
import fs from "fs"; // Menggunakan fs.promises untuk menghindari callback hell

const allowedType = [".jpg", ".jpeg", ".png", ".gif"];

export const getData_diri = async(req, res) =>{
    try {
        const {accountId} = req.user
        const response = await Data_diri.findAll({
          where: {
            accountId: accountId, 
          },
        });
        res.status(200).json(response);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getData_diriByIdWithChild = async (req, res) => {
    try {
        const { accountId } = req.user
        const response = await Data_diri.findOne({
            where: {
                accountId: accountId,
            },
            include: [
                {
                    model: Pendidikan,
                },
                {
                    model: Organisasi,
                },
                {
                    model: Skill,
                },
                {
                    model: Portofolio,
                },
                {
                    model: Galeri,
                },
            ],
        });

        if (!response) {
            return res.status(404).json({ error: "Data Diri Not Found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createData_diri = async (req, res) => {
    try {
         const {accountId} = req.user
        const { nama, tempat_lahir, tanggal_lahir, alamat, email, no_telp, foto, deskripsi, linkedin, instagram, x, github } = req.body;

        // Cek apakah data diri sudah ada untuk akun dengan accountId yang sama
        let existingDataDiri = await Data_diri.findOne({
            where: { accountId }
        });

    if (existingDataDiri) {
      return res.status(422).json({ msg: "Data Diri already exists. Use update instead." });
    }

    // Mengecek apakah ada file foto yang diunggah
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Image Type" });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      }

      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Server Error" });
        }

        // Membuat data diri baru dengan URL foto
        const newDataDiri = await Data_diri.create({
          nama,
          tempat_lahir,
          tanggal_lahir,
          alamat,
          email,
          no_telp,
          deskripsi,
          linkedin,
          instagram,
          x,
          github,
          foto: url,
          accountId,
        });

        res.status(201).json({ msg: "Data Diri Created", dataDiriId: newDataDiri.id });
      });
    } else {
      // Jika tidak ada foto yang diunggah, hanya membuat data diri tanpa foto
      const newDataDiri = await Data_diri.create({
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        email,
        no_telp,
        deskripsi,
        linkedin,
        instagram,
        x,
        github,
        accountId,
      });

      res.status(201).json({ msg: "Data Diri Created", dataDiriId: newDataDiri.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Mengupdate data diri berdasarkan ID dan accountId
const allowedType = [".jpg", ".jpeg", ".png", ".gif"];

export const updateData_diri = async (req, res) => {
  try {
    const { accountId} = req.user 
    const { nama, tempat_lahir, tanggal_lahir, alamat, email, no_telp, deskripsi, linkedin, instagram, x, github } = req.body;

    // Mencari data_diri yang sesuai dengan accountId
    let dataDiri = await Data_diri.findOne({
      where: { accountId },
    });

    if (!dataDiri) {
      return res.status(404).json({ msg: "Data Diri not found" });
    }

    let fotoUrl = dataDiri.foto;

    // Mengecek apakah ada file foto yang diunggah
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Image Type" });
      }
      if (file.size > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      }

      // Menghapus foto lama (jika ada)
      if (dataDiri.foto) {
        const oldFilePath = path.join(process.cwd(), "public", "images", path.basename(dataDiri.foto));
        fs.unlinkSync(oldFilePath);
      }

      // Memindahkan foto baru ke direktori
      file.mv(path.join(process.cwd(), "public", "images", fileName), async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Server Error" });
        }

        // Set fotoUrl ke URL foto yang baru
        fotoUrl = url;

        // Mengupdate data_diri dengan URL foto yang baru
        await dataDiri.update({
          nama,
          tempat_lahir,
          tanggal_lahir,
          alamat,
          email,
          no_telp,
          deskripsi,
          linkedin,
          instagram,
          x,
          github,
          foto: fotoUrl,
        });

        res.status(200).json({ msg: "Data Diri Updated Successfully" });
      });
    } else {
      // Jika tidak ada foto yang diunggah, hanya mengupdate data_diri tanpa foto
      await dataDiri.update({
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        email,
        no_telp,
        deskripsi,
        linkedin,
        instagram,
        x,
        github,
        foto: fotoUrl,
      });

      res.status(200).json({ msg: "Data Diri Updated Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteData_diri = async (req, res) => {
  try {
    const { accountId } = req.user
    const result = await Data_diri.destroy({
      where: {
        accountId: accountId, 
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Data Diri not found" });
    } else {
      res.status(200).json({ msg: "Data Diri Deleted" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
