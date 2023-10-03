import Pendidikan from "../models/PendidikanModel.js";

// Mendapatkan semua pendidikan berdasarkan dataDiriId
export const getPendidikan = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const response = await Pendidikan.findAll({
      where: {
        dataDiriId: dataDiriId, // Menggunakan dataDiriId dari URL
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan pendidikan berdasarkan ID
export const getPendidikanById = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const response = await Pendidikan.findOne({
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

// Membuat pendidikan untuk dataDiriId tertentu
export const createPendidikan = async (req, res) => {
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const { nama_instansi, awal_periode, akhir_periode, jurusan } = req.body;

    await Pendidikan.create({
      nama_instansi,
      awal_periode,
      akhir_periode,
      jurusan,
      dataDiriId, // Menggunakan dataDiriId dari URL
    });

    res.status(201).json({ msg: "Pendidikan Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui pendidikan berdasarkan ID dan dataDiriId
export const updatePendidikan = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const [updatedRowCount] = await Pendidikan.update(req.body, {
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId,
      },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: "Pendidikan not found" });
    } else {
      res.status(200).json({ msg: "Pendidikan Updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus pendidikan berdasarkan ID dan dataDiriId
export const deletePendidikan = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const result = await Pendidikan.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId,
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Pendidikan not found" });
    } else {
      res.status(200).json({ msg: "Pendidikan Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
