import Organisasi from "../models/OrganisasiModel.js";

export const getOrganisasi = async (req, res) => {
  try {
    const response = await Organisasi.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrganisasiById = async (req, res) => {
  try {
    const response = await Organisasi.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrganisasi = async (req, res) => {
  try {
    await Organisasi.create(req.body);
    res.status(201).json({ msg: "Organisasi Created" });
  } catch (error) {
    console.log(error.message);
  }
}

export const updateOrganisasi = async (req, res) => {
  try {
    await Organisasi.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Organisasi Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOrganisasi = async (req, res) => {
  try {
    await Organisasi.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Organisasi Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};