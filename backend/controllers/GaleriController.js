import Galeri from "../models/GaleriModel.js";
import path from "path";
import fs from "fs";
import url from "url";

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
<<<<<<< HEAD
  try {
    const { dataDiriId } = req.params; // Mengambil dataDiriId dari URL
    const { nama_kegiatan, image, deskripsi } = req.body;
=======
  if (req.files === null) return res.status(400).json({ msg: "No FIle Uploaded" });
  const nama_kegiatan = req.body.nama_kegiatan;
  const deskripsi = req.body.deskripsi;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const filename = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
>>>>>>> ca53ff76 (update amel)

  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${filename}`, async (err) => {
    if (err) return res.status(500).json({ msg: error.message });
    try {
      await Galeri.create({ nama_kegiatan: nama_kegiatan, image: url, deskripsi: deskripsi });
      res.status(201).json({ msg: "Galeri Created Succesfully" });
    } catch (error) {
      console.log(error.message);
    }
<<<<<<< HEAD

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
=======
  });
>>>>>>> ca53ff76 (update amel)
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
  const galeri = await Galeri.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!galeri) return res.status(404).json({ msg: "No Data Found" });
  try {
<<<<<<< HEAD
    const { dataDiriId, id } = req.params; // Mengambil ID dari URL
=======
    const filepath = `./public/images/${galeri.image}`;
    fs.unlinkSync(filepath);
>>>>>>> ca53ff76 (update amel)
    await Galeri.destroy({
      where: {
        id: id, // Menggunakan ID dari URL
        dataDiriId: dataDiriId, // Juga memeriksa dataDiriId
      },
    });
    res.status(200).json({ msg: "Galeri Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};
