import { Sequelize, DataTypes } from "sequelize"; //ssss
import db from "../config/Database.js";

const Galeri = db.sequelize.define(
  "galeri",
  {
    nama_kegiatan: DataTypes.STRING,
    image: DataTypes.ARRAY(DataTypes.STRING), 
    deskripsi: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

export default Galeri;

(async () => {
  await db.sequelize.sync();
})();
