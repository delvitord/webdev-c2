import Galeri from "../models/GaleriModel.js";

// Mendapatkan semua galeri berdasarkan dataDiriId
export const getGaleri = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const response = await Galeri.findAll({
      where: {
        dataDiriId: dataDiriId, // Menggunakan dataDiriId dari URL
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan galeri berdasarkan ID
export const getGaleriById = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const response = await Galeri.findOne({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId, // Juga memeriksa dataDiriId
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Membuat galeri untuk dataDiriId tertentu
export const createGaleri = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const { nama_kegiatan, image, deskripsi } = req.body;

    // Periksa apakah "image" adalah sebuah array
    if (!Array.isArray(image)) {
      return res.status(400).json({ msg: "Image must be an array" });
    }

    // Simpan data ke dalam kolom "image"
    await Galeri.create({
      nama_kegiatan,
      image, // Menyimpan array gambar langsung ke dalam kolom "image"
      deskripsi,
      dataDiriId, // Menggunakan dataDiriId dari URL
    });

    res.status(201).json({ msg: "Galeri Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui galeri berdasarkan ID
export const updateGaleri = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    await Galeri.update(req.body, {
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId, // Juga memeriksa dataDiriId
      },
    });
    res.status(200).json({ msg: "Galeri Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Menghapus galeri berdasarkan ID
export const deleteGaleri = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    await Galeri.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId, // Juga memeriksa dataDiriId
      },
    });
    res.status(200).json({ msg: "Galeri Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
