import Account from "../models/AccountModel.js"; 
import Data_diri from "../models/DataDiriModel.js"; 
import Pendidikan from "../models/PendidikanModel.js";
import Organisasi from "../models/OrganisasiModel.js";
import Skill from "../models/SkillModel.js";
import Portofolio from "../models/PortofolioModel.js";
import Galeri from "../models/GaleriModel.js";

export const getData_diri = async(req, res) =>{
    try {
        const { accountId } = req.params; // Mengambil dataDiriId dari URL
        const response = await Data_diri.findAll({
          where: {
            accountId: accountId, // Menggunakan dataDiriId dari URL
          },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getData_diriById = async(req, res) =>{
    try {
        const { accountId, id } = req.params; // Mengambil ID dari URL
        const response = await Data_diri.findOne({
          where: {
            id: id, // Menggunakan ID dari URL
            accountId: accountId, // Juga memeriksa dataDiriId
          },
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

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
                    as: 'pendidikan', // Gunakan alias yang sesuai
                },
                {
                    model: Organisasi,
                    as: 'organisasi', // Gunakan alias yang sesuai
                },
                {
                    model: Skill,
                    as: 'skill', // Gunakan alias yang sesuai
                },
                {
                    model: Portofolio,
                    as: 'portofolio', // Gunakan alias yang sesuai
                },
                {
                    model: Galeri,
                    as: 'galeri', // Gunakan alias yang sesuai
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
        const { accountId } = req.params; // Mengambil AccoundId dari URL
        const { nama, tempat_lahir, tanggal_lahir, alamat, email, no_telp, foto, deskripsi, linkedin, instagram, x, github } = req.body;

        // Memanggil create untuk membuat data diri baru
        const newDataDiri = await Data_diri.create({
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
        // Mengirimkan respons dengan status 201 dan ID data diri yang baru saja dibuat
        res.status(201).json({ msg: "Data Diri Created", dataDiriID });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateData_diri = async(req, res) =>{
    try {
        const { accountId, id } = req.params; // Mengambil ID dari URL
        await Data_diri.update(req.body, {
        where: {
            id: id, // Menggunakan ID dari URL
            accountId: accountId, // Juga memeriksa dataDiriId
        },
        });
        res.status(200).json({ msg: "Data Diri Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteData_diri = async(req, res) =>{
    try {
        const { accountId, id } = req.params; // Mengambil ID dari URL
        await Data_diri.destroy({
          where: {
            id: id, // Menggunakan ID dari URL
            accountId: accountId, // Juga memeriksa dataDiriId
          },
        });
        res.status(200).json({ msg: "Data Diri Deleted" });
      } catch (error) {
        console.log(error.message);
      }
}