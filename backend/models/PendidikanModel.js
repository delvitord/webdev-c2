import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Pendidikan = db.sequelize.define(
  "pendidikan",
  {
    nama_instansi: DataTypes.STRING,
    awal_periode: DataTypes.DATEONLY,
    akhir_periode: DataTypes.DATEONLY,
    jurusan: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);

export default Pendidikan;

(async () => {
  await db.sequelize.sync();
})();
