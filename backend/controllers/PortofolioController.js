import Portofolio from "../models/PortofolioModel.js";

// Mendapatkan semua portofolio berdasarkan dataDiriId
export const getPortofolio = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const response = await Portofolio.findAll({
      where: {
        dataDiriId: dataDiriId, // Menggunakan dataDiriId dari URL
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan portofolio berdasarkan ID
export const getPortofolioById = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const response = await Portofolio.findOne({
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

// Membuat portofolio untuk dataDiriId tertentu
export const createPortofolio = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const { judul, deskripsi, file, image, link } = req.body;

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
      dataDiriId, // Menggunakan dataDiriId dari URL
    });

    res.status(201).json({ msg: "Portofolio Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui portofolio berdasarkan ID
export const updatePortofolio = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    await Portofolio.update(req.body, {
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId,
      },
    });
    res.status(200).json({ msg: "Portofolio Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Menghapus portofolio berdasarkan ID
export const deletePortofolio = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    await Portofolio.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId,
      },
    });
    res.status(200).json({ msg: "Portofolio Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
