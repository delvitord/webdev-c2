import Skill from "../models/SkillModel.js";
import Data_diri from "../models/DataDiriModel.js"; 

// Mendapatkan semua skill berdasarkan dataDiriId
export const getSkill = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Skill.findAll({
      where: {
        dataDiriId: dataDiriId, 
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan skill berdasarkan ID
export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Skill.findOne({
      where: {
        id: id, 
        dataDiriId: dataDiriId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Membuat skill untuk dataDiriId tertentu
export const createSkill = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const { nama_skill, level_keahlian } = req.body;

    const newSkill = await Skill.create({
      nama_skill, 
      level_keahlian,
      dataDiriId,
    });
    res.status(201).json({ msg: "Skill Created", id: newSkill.id  });
  } catch (error) {
    console.log(error.message);
  }
};

// Memperbarui skill berdasarkan ID dan dataDiriId
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const [updatedRowCount] = await Skill.update(req.body, {
      where: {
        id: id,
        dataDiriId: dataDiriId,
      },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: "Skill not found" });
    } else {
      res.status(200).json({ msg: "Skill Updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus skill berdasarkan ID dan dataDiriId
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const result = await Skill.destroy({
      where: {
        id: id, 
        dataDiriId: dataDiriId,
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Skill not found" });
    } else {
      res.status(200).json({ msg: "Skill Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

