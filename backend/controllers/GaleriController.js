import Galeri from "../models/GaleriModel.js";
import path from "path";
import fs from "fs";

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
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
  const { nama_kegiatan, deskripsi } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Galeri.create({ nama_kegiatan: nama_kegiatan, image: url, deskripsi: deskripsi, dataDiriId });
      res.status(201).json({ msg: "Galeri Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

// Memperbarui galeri berdasarkan ID
const allowedType = [".jpg", ".jpeg", ".png", ".gif"];

// Memperbarui galeri berdasarkan ID
export const updateGaleri = async (req, res) => {
  const { id } = req.params;
  const galeri = await Galeri.findByPk(id);

  if (!galeri) {
    return res.status(404).json({ error: "Galeri not found" });
  }

  let fileName = galeri.image;

  if (req.files && req.files.file) {
    const file = req.files.file;
    const ext = path.extname(file.name);
    const filename = path.basename(galeri.image);
    const filepath = `./public/images/${filename}`;

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ error: "Invalid Image Type" });
    }
    if (file.size > 5000000) {
      return res.status(422).json({ error: "Image must be less than 5 MB" });
    }

    fs.unlinkSync(filepath);

    file.mv(`./public/images/${filename}`, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "File Upload Failed" });
      }
    });

    // Set nama berkas yang baru
    fileName = filename;
  }

  const { nama_kegiatan, deskripsi } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await galeri.update({ nama_kegiatan, image: url, deskripsi });
    res.status(200).json({ success: "Galeri Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus galeri berdasarkan ID
export const deleteGaleri = async (req, res) => {
  try {
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
    const result = await Galeri.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId, // Juga memeriksa dataDiriId
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
