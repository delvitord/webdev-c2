import Account from "../models/AccountModel.js";
import Data_diri from "../models/DataDiriModel.js";
import Pendidikan from "../models/PendidikanModel.js";
import Organisasi from "../models/OrganisasiModel.js";
import Skill from "../models/SkillModel.js";
import Portofolio from "../models/PortofolioModel.js";
import Galeri from "../models/GaleriModel.js";
import path from "path";

export const getData_diri = async (req, res) => {
  try {
    const { accountId } = req.params; // Mengambil dataDiriId dari URL
    const response = await Data_diri.findAll({
      where: {
        accountId: accountId, // Menggunakan dataDiriId dari URL
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getData_diriById = async (req, res) => {
  try {
    const { accountId, id } = req.params; // Mengambil ID dari URL
    const response = await Data_diri.findOne({
      where: {
        id: id, // Menggunakan ID dari URL
        accountId: accountId, // Juga memeriksa dataDiriId
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getData_diriByIdWithChild = async (req, res) => {
  try {
    const { accountId, id } = req.params; // Mengambil ID dari URL
    const response = await Data_diri.findOne({
      where: {
        id: id,
        accountId: accountId,
      },
      include: [
        {
          model: Pendidikan,
          as: "pendidikan", // Gunakan alias yang sesuai
        },
        {
          model: Organisasi,
          as: "organisasi", // Gunakan alias yang sesuai
        },
        {
          model: Skill,
          as: "skill", // Gunakan alias yang sesuai
        },
        {
          model: Portofolio,
          as: "portofolio", // Gunakan alias yang sesuai
        },
        {
          model: Galeri,
          as: "galeri", // Gunakan alias yang sesuai
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
};

export const createData_diri = async (req, res) => {
  try {
    const { accountId } = req.params; // Mengambil AccoundId dari URL
    const { nama, tempat_lahir, tanggal_lahir, alamat, email, no_telp, deskripsi, linkedin, instagram, x, github } = req.body;

    // Cek apakah data diri sudah ada untuk akun dengan accountId yang sama
    let existingDataDiri = await Data_diri.findOne({
      where: { accountId },
    });

    if (existingDataDiri) {
      // Jika data diri sudah ada, perbarui data diri yang ada
      await existingDataDiri.update({
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
      });
    } else {
      // Jika data diri belum ada, buat data diri baru
      existingDataDiri = await Data_diri.create({
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
    }

    const dataDiriId = existingDataDiri.id;

    // Mengecek apakah ada file foto yang diunggah
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

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

        // Mengupdate data diri dengan URL foto
        await existingDataDiri.update({
          foto: url,
        });

        res.status(201).json({ msg: "Data Diri Created/Updated", dataDiriId });
      });
    } else {
      // Jika tidak ada foto yang diunggah, hanya mengirimkan respons tanpa perubahan foto
      res.status(201).json({ msg: "Data Diri Created/Updated", dataDiriId });
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
    const { accountId, id } = req.params; // Mengambil ID dari URL
    const data_diri = await Data_diri.findByPk(id);

    if (!data_diri) {
      return res.status(404).json({ error: "Data Diri not found" });
    }

    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const ext = path.extname(file.name);

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ error: "Invalid Image Type" });
      }
      if (file.size > 5000000) {
        return res.status(422).json({ error: "Image must be less than 5 MB" });
      }

      // Hapus gambar lama jika ada
      if (data_diri.foto) {
        const oldFilePath = `./public/images/${data_diri.foto}`;
        fs.unlinkSync(oldFilePath);
      }

      // Simpan gambar baru dengan nama yang unik
      const fileName = `${file.md5}${ext}`;
      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: "File Upload Failed" });
        }
      });

      // Update data diri dengan nama file yang baru
      await data_diri.update({
        foto: fileName,
      });
    }

    const { nama, tempat_lahir, tanggal_lahir, alamat, email, no_telp, deskripsi, linkedin, instagram, x, github } = req.body;

    await data_diri.update({
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
    });

    res.status(200).json({ success: "Data Diri Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus data diri berdasarkan ID dan accountId
export const deleteData_diri = async (req, res) => {
  try {
    const { accountId, id } = req.params; // Mengambil ID dari URL
    const result = await Data_diri.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        accountId: accountId, // Juga memeriksa accountId
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Data Diri not found" });
    } else {
      res.status(200).json({ msg: "Data Diri Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
