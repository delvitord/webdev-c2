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
      const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
      let imgLength;
      try {
        imgLength = imageFiles[0].data.length;
      } catch (error) {
        imgLength = 0;
      }
      let url;
  
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
          addImage(dataDiriId, imgLength, url, req, res);
  
        });
      } else {
        // Jika tidak ada file yang diunggah, tanpa ada file
        addImage(dataDiriId, imgLength, url, req, res);
  
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

async function addImage(dataDiriId, imgLength, urlFile, req, res) {
  const { judul, deskripsi, link } = req.body;
  const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
  const imageUrls = [];
  if (imgLength) {
    for (const file of imageFiles) {
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      if (!allowedImgType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Tipe Gambar Tidak Valid" });
      }

      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Ukuran Gambar harus kurang dari 5 MB" });
      }

      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        imageUrls.push(url);
        // Jika semua file telah diunggah, simpan array imageUrls ke dalam database
        if (imageUrls.length === imageFiles.length && urlFile) {
          try {
            const newPortofolio = await Portofolio.create({
              judul,
              deskripsi,
              file: urlFile,
              image: imageUrls, 
              link,
              dataDiriId, 
            });
            res.status(201).json({ msg: "Portofolio Created", id: newPortofolio.id });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
          }
        } else if (imageUrls.length === imageFiles.length) {
          try {
            const newPortofolio = await Portofolio.create({
              judul,
              deskripsi,
              image: imageUrls, 
              link,
              dataDiriId, 
            });
            res.status(201).json({ msg: "Portofolio Created", id: newPortofolio.id });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
          }
        }

      });
    }
  } else{
    if (urlFile){
      try {
        const newPortofolio = await Portofolio.create({
          judul,
          deskripsi,
          file: urlFile,
          link,
          dataDiriId, 
        });
        res.status(201).json({ msg: "Portofolio Created", id: newPortofolio.id });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    } 
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
  
    const { judul, deskripsi, link, image } = req.body;
    
    // Convert the comma-separated string of URLs in req.body.image into an array
    let existingImageUrls;
    
    if (image > 1){
      existingImageUrls = image.split(',');
    } else if (image === 1){
      existingImageUrls = [image];
    }
    else {
      existingImageUrls = [''];
    }
    try {
      const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
      console.log("imagefile", imageFiles);
      const newImageUrls = [];
  
      for (const file of imageFiles) {
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
        if (!allowedImgType.includes(ext.toLowerCase())) {
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
          newImageUrls.push(url);
  
        });
      }
      const updatedImageUrls = existingImageUrls.concat(newImageUrls);
            
            try {
              portofolio.update({
                judul: judul,
                deskripsi: deskripsi,
                image: updatedImageUrls, // Store the array of image URLs
                link: link,
              });
            } catch (error) {
              console.error(error.message);
              res.status(500).json({ msg: "Internal Server Error" });
            }
    } catch (error){
      
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

