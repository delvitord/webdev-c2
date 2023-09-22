import Pendidikan from "../models/PendidikanModel.js";

export const getPendidikan = async (req, res) => {
  try {
    const response = await Pendidikan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPendidikanById = async (req, res) => {
  try {
    const response = await Pendidikan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPendidikan = async (req, res) => {
  try {
    await Pendidikan.create(req.body);
    res.status(201).json({ msg: "Pendidikan Created" });
  } catch (error) {
    console.log(error.message);
  }
}

export const updatePendidikan = async (req, res) => {
  try {
    await Pendidikan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pendidikan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePendidikan = async (req, res) => {
  try {
    await Pendidikan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pendidikan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};