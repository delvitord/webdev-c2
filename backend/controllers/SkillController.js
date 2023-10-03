import Skill from "../models/SkillModel.js";

// Mendapatkan semua skill berdasarkan dataDiriId
export const getSkill = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const response = await Skill.findAll({
      where: {
        dataDiriId: dataDiriId, // Menggunakan dataDiriId dari URL
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
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const response = await Skill.findOne({
      where: {
        id: id, // Menggunakan ID dari URL
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
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const skillData = {
      nama_skill: req.body.nama_skill,
      level_keahlian: req.body.level_keahlian,
      dataDiriId: dataDiriId, // Menggunakan dataDiriId dari URL
    };

    await Skill.create(skillData);
    res.status(201).json({ msg: "Skill Created" });
  } catch (error) {
    console.log(error.message);
  }
};

// Memperbarui skill berdasarkan ID dan dataDiriId
export const updateSkill = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const [updatedRowCount] = await Skill.update(req.body, {
      where: {
        id: id, // Menggunakan ID dari URL
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
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const result = await Skill.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
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

