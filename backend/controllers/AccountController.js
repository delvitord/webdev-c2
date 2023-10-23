import Account from "../models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const response = await Account.findAll({
      attributes: ["id", "username", "email", "password", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findOne({
      where: { id: accountId },
      attributes: ["id", "username", "email", "password", "role"],
    });

    if (!account) {
      return res.status(404).json({ msg: "Akun tidak ditemukan" });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


export const Register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingAccount = await Account.findOne({
      where: { email: email },
    });

    if (existingAccount) {
      return res.status(400).json({ msg: "Email sudah terdaftar!!" });
    }

    if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak sesuai!!" });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10); // Jumlah putaran garam
    const hashPass = await bcrypt.hash(password, salt);

    // Buat akun baru
    await Account.create({
      username: username,
      email: email,
      password: hashPass,
    });

    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan saat registrasi" });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params; // Dapatkan ID akun dari parameter permintaan
    const userData = await Account.findOne({ where: { id: id } });
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const [updatedRowCount] = await Account.update(req.body, {
      where: {
        id: id,
      },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ msg: "User not found" });
    } else {
      res.status(200).json({ msg: "User Updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params; // Dapatkan ID akun dari parameter permintaan
    const userData = await Account.findOne({ where: { id: id } });
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const result = await Account.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      res.status(404).json({ msg: "User not found" });
    } else {
      res.status(200).json({ msg: "User Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const Login = async (req, res) => {
  try {
    const account = await Account.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!account) {
      return res.status(401).json({ msg: "Akun tidak terdaftar!!" });
    }

    const match = await bcrypt.compare(req.body.password, account[0].password);
    if (!match) return res.status(400).json({ msg: "Username atau password salah" });
    const accountId = account[0].id;
    const username = account[0].username;
    const email = account[0].email;
    const role = account[0].role;
    const accessToken = jwt.sign({ accountId, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ accountId, username, email, role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Account.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: accountId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ msg: "Login Berhasil", access_token: accessToken, account_info: account, role: account[0].role });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat Login!!" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const account = await Account.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!account[0]) return res.status(204);
  const accountId = account[0].id;
  await Account.update(
    { refresh_token: null },
    {
      where: {
        id: accountId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
