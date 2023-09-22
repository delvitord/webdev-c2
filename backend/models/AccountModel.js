import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Account = db.sequelize.define(
  "account",
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  },
  {
    freezeTableName: true,
  }
);

export default Account;

(async () => {
  await db.sequelize.sync();
})();
