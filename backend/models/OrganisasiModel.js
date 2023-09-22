import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";


const Organisasi = db.sequelize.define(
  "organisasi",
  {
    nama_organisasi: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    awal_periode: DataTypes.DATEONLY,
    akhir_periode: DataTypes.DATEONLY,
    deskripsi: DataTypes.TEXT
  },
  {
    freezeTableName: true,
  }
);

export default Organisasi;

(async () => {
  await db.sequelize.sync();
})();
