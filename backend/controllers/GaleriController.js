import Galeri from "../models/GaleriModel.js";

export const getGaleri = async (req, res) => {
  try {
    const response = await Galeri.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getGaleriById = async (req, res) => {
  try {
    const response = await Galeri.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createGaleri = async (req, res) => {
  try {
    const { nama_kegiatan, image, deskripsi, dataDiriId } = req.body;

    // Periksa apakah "image" adalah sebuah array
    if (!Array.isArray(image)) {
      return res.status(400).json({ msg: "Image must be an array" });
    }

    // Simpan data ke dalam kolom "image"
    await Galeri.create({
      nama_kegiatan,
      image, // Menyimpan array gambar langsung ke dalam kolom "image"
      deskripsi,
      dataDiriId,
    });

    res.status(201).json({ msg: "Galeri Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateGaleri = async (req, res) => {
  try {
    await Galeri.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Galeri Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGaleri = async (req, res) => {
  try {
    await Galeri.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Galeri Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
