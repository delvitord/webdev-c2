import Organisasi from "../models/OrganisasiModel.js";
import Data_diri from "../models/DataDiriModel.js";

// Mendapatkan semua organisasi berdasarkan dataDiriId
export const getOrganisasi = async (req, res) => {
  try {
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Organisasi.findAll({
      where: {
        dataDiriId: dataDiriId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan organisasi berdasarkan ID
export const getOrganisasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Organisasi.findOne({
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

// Membuat organisasi untuk dataDiriId tertentu
export const createOrganisasi = async (req, res) => {
  try {
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const { nama_organisasi, jabatan, awal_periode, akhir_periode, deskripsi } = req.body;

    const newOrganisasi = await Organisasi.create({
      nama_organisasi,
      jabatan,
      awal_periode,
      akhir_periode,
      deskripsi,
      dataDiriId,
    });

    res.status(201).json({ msg: "Organisasi Created", id: newOrganisasi.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui organisasi berdasarkan ID dan dataDiriId
export const updateOrganisasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const [updatedRowCount] = await Organisasi.update(req.body, {
      where: {
        id: id,
        dataDiriId: dataDiriId,
      },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: "Organisasi not found" });
    } else {
      res.status(200).json({ msg: "Organisasi Updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus organisasi berdasarkan ID dan dataDiriId
export const deleteOrganisasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const result = await Organisasi.destroy({
      where: {
        id: id,
        dataDiriId: dataDiriId,
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Organisasi not found" });
    } else {
      res.status(200).json({ msg: "Organisasi Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
