import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Account = db.sequelize.define(
  "account",
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);

export default Account;

(async () => {
  await db.sequelize.sync();
})();
