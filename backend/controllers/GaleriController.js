import Galeri from "../models/GaleriModel.js";
import path from "path";
import fs from "fs";
import Data_diri from "../models/DataDiriModel.js"; 

// Mendapatkan semua galeri berdasarkan dataDiriId
export const getGaleri = async (req, res) => {
  try {
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Galeri.findAll({
      where: {
        dataDiriId: dataDiriId, 
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
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const response = await Galeri.findOne({
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

const allowedType = [".jpg", ".jpeg", ".png", ".gif"];
// Membuat galeri untuk dataDiriId tertentu
export const createGaleri = async (req, res) => {
  const { accountId } = req.user;
  const userData = await Data_diri.findOne({ where: { accountId: accountId } });
  const dataDiriId = userData.id;
  const { nama_kegiatan, deskripsi } = req.body;
  const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
  const imageUrls = [];

  for (const file of imageFiles) {
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Tipe Gambar Tidak Valid" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Ukuran Gambar harus kurang dari 5 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      imageUrls.push(url);

      // Jika semua file telah diunggah, simpan array imageUrls ke dalam database
      if (imageUrls.length === imageFiles.length) {
        try {
          const newGaleri = await Galeri.create({
            nama_kegiatan: nama_kegiatan,
            image: imageUrls, // Simpan array URL gambar
            deskripsi: deskripsi,
            dataDiriId,
          });
          res.status(201).json({ msg: "Galeri Created", id: newGaleri.id  });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Internal Server Error" });
        }
      }
    });
  }
};


// Memperbarui galeri berdasarkan ID
export const updateGaleri = async (req, res) => {
  const { id } = req.params;
  const { accountId } = req.user;
  const userData = await Data_diri.findOne({ where: { accountId: accountId } });
  const dataDiriId = userData.id;
  const galeri = await Galeri.findByPk(id);

  if (!galeri) {
    return res.status(404).json({ error: "Galeri not found" });
  }

  if (galeri.dataDiriId !== dataDiriId) {
    return res.status(404).json({ error: "Galeri not found" });
  }

  const { nama_kegiatan, deskripsi } = req.body;
  const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
  const imageUrls = [];

  for (const file of imageFiles) {
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Type" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "File Upload Failed" });
      }
      imageUrls.push(url);

      // If all files are uploaded, update the galeri entry in the database
      if (imageUrls.length === imageFiles.length) {
        try {
          galeri.update({
            nama_kegiatan: nama_kegiatan,
            image: imageUrls, // Store the array of image URLs
            deskripsi: deskripsi,
          });
          res.status(200).json({ msg: "Galeri Updated Successfully" });
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ msg: "Internal Server Error" });
        }
      }
    });
  }
};

// Menghapus galeri berdasarkan ID
export const deleteGaleri = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const result = await Galeri.destroy({
      where: {
        id: id, 
        dataDiriId: dataDiriId, 
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "Galeri not found" });
    } else {
      res.status(200).json({ msg: "Galeri Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
