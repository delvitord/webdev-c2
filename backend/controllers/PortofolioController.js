import Portofolio from "../models/PortofolioModel.js";
import Data_diri from "../models/DataDiriModel.js"; 

// Mendapatkan semua portofolio berdasarkan dataDiriId
export const getPortofolio = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Portofolio.findAll({
      where: {
        dataDiriId: dataDiriId, 
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
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Portofolio.findOne({
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

// Membuat portofolio untuk dataDiriId tertentu
export const createPortofolio = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
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
      dataDiriId, 
    });

    res.status(201).json({ msg: "Portofolio Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Memperbarui portofolio berdasarkan ID dan dataDiriId
export const updatePortofolio = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const [updatedRowCount] = await Portofolio.update(req.body, {
      where: {
        id: id, 
        dataDiriId: dataDiriId,
      },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: "Portofolio not found" });
    } else {
      res.status(200).json({ msg: "Portofolio Updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus portofolio berdasarkan ID dan dataDiriId
export const deletePortofolio = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const result = await Portofolio.destroy({
      where: {
        id: id, 
        dataDiriId: dataDiriId,
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Portofolio not found" });
    } else {
      res.status(200).json({ msg: "Portofolio Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

