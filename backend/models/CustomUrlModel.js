import { Sequelize, DataTypes } from "sequelize"; 
import db from "../config/Database.js";

const CustomUrl = db.sequelize.define(
  "custom_url",
  {
    url_custom: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default CustomUrl;

(async () => {
  await db.sequelize.sync();
})();
