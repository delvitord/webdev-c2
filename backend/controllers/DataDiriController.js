import Data_diri from "../models/DataDiriModel.js"; //Tambah komentar
import Pendidikan from "../models/PendidikanModel.js";
import Organisasi from "../models/OrganisasiModel.js";
import Skill from "../models/SkillModel.js";
import Portofolio from "../models/PortofolioModel.js";
import Galeri from "../models/GaleriModel.js";

export const getData_diri = async(req, res) =>{
    try {
        const response = await Data_diri.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getData_diriById = async(req, res) =>{
    try {
        const response = await Data_diri.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getData_diriByIdWithChild = async (req, res) => {
    try {
        const response = await Data_diri.findOne({
            where: {
                id: req.params.id,
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

export const createData_diri = async(req, res) =>{
    try {
        await Data_diri.create(req.body)
        res.status(201).json({msg: "Data Diri Created"})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateData_diri = async(req, res) =>{
    try {
        await Data_diri.update(req.body,{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Data Diri Updated"})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteData_diri = async(req, res) =>{
    try {
        await Data_diri.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Data Diri Deleted"})
    } catch (error) {
        console.log(error.message)
    }
}