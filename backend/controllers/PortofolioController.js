import Portofolio from "../models/PortofolioModel.js";
import Data_diri from "../models/DataDiriModel.js"; 
import path from "path";
import fs from "fs"; 

const allowedFileType = [".pdf"];
const allowedImgType = [".jpg", ".jpeg", ".png", ".gif"];

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
    const { judul, deskripsi, link } = req.body;
    const dataDiriId = userData.id;
    try {  
      // Mengecek apakah ada file  yang diunggah
      if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;
  
        if (!allowedFileType.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: "Invalid File Type" });
        }
        if (fileSize > 30000000) {
          return res.status(422).json({ msg: "File must be less than 30 MB" });
        }
  
        file.mv(`./public/files/${fileName}`, async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Server Error" });
          }
          addImage(dataDiriId, url, req, res);
  
        });
      } else {
        // Jika tidak ada file yang diunggah, tanpa ada file
        addImage(dataDiriId, url, req, res);
  
      }
    } catch (error){
      try {
        const newPortofolio = await Portofolio.create({
          judul,
          deskripsi,
          link,
          dataDiriId, 
        });
        res.status(201).json({ msg: "Portofolio Created", id: newPortofolio.id });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function addImage(dataDiriId, urlFile, req, res) {
  const { judul, deskripsi, link } = req.body;
  if (req.files && req.files.image) {
    const image = req.files.image;
    const imageSize = image.data.length;
    const ext = path.extname(image.name);
    const imageName = image.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;

    if (!allowedImgType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Type" });
    }
    if (imageSize > 5000000) {
      return res.status(422).json({ msg: "File must be less than 5 MB" });
    }

    image.mv(`./public/images/${imageName}`, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
      }
      const newPortofolio = await Portofolio.create({
        judul,
        deskripsi,
        file: urlFile,
        image: url, 
        link,
        dataDiriId, 
      });
      res.status(201).json({ msg: "Portofolio Created", id: newPortofolio.id });

    });
  } else {
    console.log("tidak ada image");

  }

}


export const updatePortofolio = async (req, res) => {
  try {
    const { id } = req.params; 
    const { accountId } = req.user; 
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    let portofolio = await Portofolio.findOne({
      where: { id },
    });
    const { judul, deskripsi, link, image, file } = req.body;
    console.log(image);
    console.log(judul);
    console.log(file);
    console.log(req.files.files);
    console.log(req.files.image);
    if (!portofolio) {
      return res.status(404).json({ error: "Portofolio not found" });
    }

    if (portofolio.dataDiriId !== dataDiriId) {
      return res.status(404).json({ error: "Portofolio not found" });
    }

    let fileUrl = file;

     // Mengecek apakah ada file yang diunggah
    if (req.files && req.files.file) {
      const file = req.files.file;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;

      if (!allowedFileType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid File Type" });
      }
      if (file.size > 30000000) {
        return res.status(422).json({ msg: "File must be less than 30 MB" });
      }

      // Menghapus file lama (jika ada)
      if (portofolio.file) {
        const oldFilePath = path.join(process.cwd(), "public", "files", path.basename(portofolio.file));
        fs.unlinkSync(oldFilePath);
      }

      // Memindahkan file baru ke direktori
      file.mv(path.join(process.cwd(), "public", "files", fileName), async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Server Error" });
        }

        // Set fileUrl ke URL file yang baru
        fileUrl = url;

        // Mengupdate data_diri dengan URL file yang baru
        await portofolio.update({
          judul,
          deskripsi,
          file: fileUrl,
          link,
          image,
          dataDiriId, 
        });
        updateImage(id, req, res)
        res.status(200).json({ msg: "Portofolio Updated Successfully" });
      });
    }  else {
      // Jika tidak ada file yang diunggah, hanya mengupdate portofolio tanpa file
      await portofolio.update({
        judul,
        deskripsi,
        file: fileUrl,
        link,
        dataDiriId, 
        image,
      });

      updateImage(id, req, res)
      res.status(200).json({ msg: "Portofolio Updated Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
  async function updateImage(id, req, res) {
    const { accountId } = req.user;
    const userData = await Data_diri.findOne({ where: { accountId: accountId } });
    const dataDiriId = userData.id;
    const portofolio = await Portofolio.findByPk(id);
  
    if (!portofolio) {
      return res.status(404).json({ error: "Portofolio not found" });
    }
  
    if (portofolio.dataDiriId !== dataDiriId) {
      return res.status(404).json({ error: "Portofolio not found" });
    }
  
    const { judul, deskripsi, link, file, image } = req.body;
    
    let imageUrl = image;
    console.log("Image Url1", imageUrl);

     // Mengecek apakah ada file yang diunggah
    if (req.files && req.files.image) {
      const image = req.files.image;
      const ext = path.extname(image.name);
      const imageName = image.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;

      if (!allowedImgType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Image Type" });
      }
      if (image.size > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      }

      // Menghapus image lama (jika ada)
      if (portofolio.image) {
        const oldFilePath = path.join(process.cwd(), "public", "images", path.basename(portofolio.image));
        fs.unlinkSync(oldFilePath);
      }

      // Memindahkan file baru ke direktori
      image.mv(path.join(process.cwd(), "public", "images", imageName), async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Server Error" });
        }

        // Set fileUrl ke URL file yang baru
        imageUrl = url;
        console.log("Image Url2", imageUrl);

        // Mengupdate data_diri dengan URL file yang baru
        await portofolio.update({
          judul,
          deskripsi,
          file,
          link,
          image: imageUrl,
          dataDiriId, 
        });
      });
    }  else {
      console.log("tidak ada image");
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

