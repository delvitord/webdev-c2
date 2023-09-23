import Skill from "../models/SkillModel.js";

export const getSkill = async (req, res) => {
  try {
    const response = await Skill.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSkillById = async (req, res) => {
  try {
    const response = await Skill.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSkill = async (req, res) => {
  try {
    await Skill.create(req.body);
    res.status(201).json({ msg: "Skill Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSkill = async (req, res) => {
  try {
    await Skill.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Skill Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await Skill.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.console(200).json({ msg: "Skill Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
