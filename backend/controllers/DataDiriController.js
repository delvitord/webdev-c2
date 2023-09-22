import Data_diri from "../models/DataDiriModel.js";


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