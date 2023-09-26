import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Portofolio = db.sequelize.define(
  "portofolio",
  {
    judul: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    file: DataTypes.STRING,
    image: DataTypes.ARRAY(DataTypes.STRING),
    link: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);

export default Portofolio;

(async () => {
  await db.sequelize.sync();
})();
