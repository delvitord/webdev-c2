import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Skill = db.sequelize.define(
  "skill",
  {
    nama_skill: DataTypes.STRING,
    level_keahlian: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Skill;

(async () => {
  await db.sequelize.sync();
})();
