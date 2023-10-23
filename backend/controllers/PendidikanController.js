import Pendidikan from "../models/PendidikanModel.js";
import Data_diri from "../models/DataDiriModel.js"; 

// Mendapatkan semua pendidikan berdasarkan dataDiriId
export const getPendidikan = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Pendidikan.findAll({
      where: {
        dataDiriId: dataDiriId, 
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
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Pendidikan.findOne({
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

// Membuat pendidikan untuk dataDiriId tertentu
export const createPendidikan = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const { nama_instansi, awal_periode, akhir_periode, jurusan } = req.body;

    if (awal_periode > akhir_periode)
      return res
        .status(404)
        .json({
          error:
            "Tahun masuk harus lebih awal dari tahun lulus",
        });
    const newPendidikan = await Pendidikan.create({
      nama_instansi,
      awal_periode,
      akhir_periode,
      jurusan,
      dataDiriId, 
    });

    res.status(201).json({ msg: "Pendidikan Created", id: newPendidikan.id   });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui pendidikan berdasarkan ID dan dataDiriId
export const updatePendidikan = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;

    const { awal_periode, akhir_periode } = req.body;

    if (awal_periode > akhir_periode)
      return res.status(404).json({
        error: "Tahun masuk harus lebih awal dari tahun lulus",
      });
    const [updatedRowCount] = await Pendidikan.update(req.body, {
      where: {
        id: id, 
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
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const result = await Pendidikan.destroy({
      where: {
        id: id, 
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
