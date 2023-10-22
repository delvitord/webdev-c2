import CustomUrl from "../models/CustomUrlModel.js";
import Data_diri from "../models/DataDiriModel.js"; 

// Mendapatkan semua custom_url berdasarkan dataDiriId
export const getCustomUrl = async (req, res) => {
  try {
    const response = await CustomUrl.findAll({
    });
    if (response.length === 0) {
      res.status(404).json({ error: "CustomUrl not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//getCustomUrlById  
export const getCustomUrlById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CustomUrl.findAll({
      where: {
        dataDiriId: id,
      },
    });
    if (response.length === 0) {
      res.status(404).json({ error: "CustomUrl not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};


export const getCustomUrlByName = async (req, res) => {
  try {
    const { url_custom } = req.params;
    const response = await CustomUrl.findAll({
      where: {
        url_custom: url_custom,
      },
    });
    if (response.length === 0) {
      res.status(404).json({ error: "CustomUrl not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};




// Membuat custom_url untuk dataDiriId tertentu
export const createCustomUrl = async (req, res) => {
  try {
    const { dataDiriId } = req.params; 
    const { url_custom } = req.body;

    //check if dataDiriId exists
    const dataDiri = await Data_diri.findOne({ where: { id: dataDiriId } });  

    if (!dataDiri) {
      return res.status(400).json({ error: "DataDiri not found" });
    } else {
      
      //check if custom_url with this dataDiriId and url_custom already exists
      const customUrl = await CustomUrl.findOne({ where: {url_custom: url_custom } }); 
      if (customUrl) {
        return res.status(400).json({ error: "CustomUrl already exists" });
      } else {
        const newCustomUrl = await CustomUrl.create({
          url_custom: url_custom, 
          dataDiriId,
        });
        res.status(201).json({ msg: "CustomUrl Created", id: newCustomUrl.id  });
      }
    }

  } catch (error) {
    console.log(error.message);
  }
};

// Memperbarui custom_url berdasarkan ID dan dataDiriId
export const updateCustomUrl = async (req, res) => {
  try {
    const { dataDiriId } = req.params; 
    const { url_custom } = req.body;
    const customUrl = await CustomUrl.findOne({ where: { url_custom: url_custom } });
    if (customUrl) {
      return res.status(400).json({ error: "CustomUrl already exists" });
    } else {
      const [updatedRowCount] = await CustomUrl.update(req.body, {
        where: {
          dataDiriId: dataDiriId,
        },
      });
      if (updatedRowCount === 0) {
        res.status(404).json({ error: "CustomUrl not found" });
      } else {
        res.status(200).json({ msg: "CustomUrl Updated" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Menghapus custom_url berdasarkan ID dan dataDiriId
export const deleteCustomUrl = async (req, res) => {
  try {
    const { dataDiriId } = req.params; 
    const result = await CustomUrl.destroy({
      where: {
        dataDiriId: dataDiriId,
      },
    });

    if (result === 0) {
      res.status(404).json({ error: "CustomUrl not found" });
    } else {
      res.status(200).json({ msg: "CustomUrl Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

