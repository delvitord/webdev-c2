import Account from "../models/AccountModel.js";
import Data_diri from "../models/DataDiriModel.js";
import Pendidikan from "../models/PendidikanModel.js";
import Organisasi from "../models/OrganisasiModel.js";
import Skill from "../models/SkillModel.js";
import Portofolio from "../models/PortofolioModel.js";
import Galeri from "../models/GaleriModel.js";
import path from "path";

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
        console.log(error.message)
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
            // Jika data diri sudah ada, perbarui data diri yang ada
            await existingDataDiri.update({
                nama,
                tempat_lahir,
                tanggal_lahir,
                alamat,
                email,
                no_telp,
                foto,
                deskripsi,
                linkedin,
                instagram,
                x,
                github
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
                foto,
                deskripsi,
                linkedin,
                instagram,
                x,
                github,
                accountId,
            });
        }

        const dataDiriId = existingDataDiri.id;

        // Mengirimkan respons dengan status 201 dan ID data diri yang baru saja dibuat/diperbarui
        res.status(201).json({ msg: "Data Diri Created/Updated", dataDiriId });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Mengupdate data diri berdasarkan ID dan accountId
const allowedType = [".jpg", ".jpeg", ".png", ".gif"];

export const updateData_diri = async (req, res) => {
    try {
      const { accountId} = req.user 
      const [updatedRowCount] = await Data_diri.update(req.body, {
        where: {
          accountId: accountId, 
        },
      });
  
      if (updatedRowCount === 0) {
        res.status(404).json({ error: "Data Diri not found" });
      } else {
        res.status(200).json({ msg: "Data Diri Updated" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Menghapus data diri berdasarkan ID dan accountId
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
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  