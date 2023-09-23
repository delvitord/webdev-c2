import Portofolio from "../models/PortofolioModel.js";

export const getPortofolio = async (req, res) => {
  try {
    const response = await Portofolio.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPortofolioById = async (req, res) => {
  try {
    const response = await Portofolio.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPortofolio = async (req, res) => {
  try {
    const { judul, deskripsi, file, image, link, dataDiriId } = req.body;

    // Periksa apakah "image" adalah sebuah array
    if (!Array.isArray(image)) {
      return res.status(400).json({ msg: "Image must be an array" });
    }

    // Simpan data ke dalam kolom "image"
    await Portofolio.create({
      judul,
      deskripsi,
      file,
      image, // Menyimpan array gambar langsung ke dalam kolom "image"
      link,
      dataDiriId
    });

    res.status(201).json({ msg: "Portofolio Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePortofolio = async (req, res) => {
  try {
    await Portofolio.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Portofolio Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePortofolio = async (req, res) => {
  try {
    await Portofolio.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Portofolio Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
