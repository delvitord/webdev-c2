import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import DataDiri from "./DataDiriModel.js"

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

Account.hasOne(
  DataDiri,
  { foreignKey: "accountId", onDelete: "CASCADE" },
  { as: "data_diri" }
);
DataDiri.belongsTo(Account);

export default Account;

(async () => {
  await db.sequelize.sync();
})();
