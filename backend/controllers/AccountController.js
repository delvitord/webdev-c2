import Account from "../models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const getAccount = async (req, res) => {
  try {
    const { accountId } = req.params; 
    const response = await Account.findAll({
        attributes: ['id', 'username', 'email']
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
      attributes: ["id", "username", "email"],
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


export const Register = async(req, res)=> {
    const { username, email, password, confPassword } = req.body
    if(password != confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak sesuai!!"})
    const salt = await bcrypt.genSalt()
    const hashPass = await bcrypt.hash(password ,salt )
    try {
        await Account.create({
            username: username,
            email: email,
            password: hashPass 
        })
        res.json({msg: "Register Berhasil"})
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res)=>{
    try {
        const account = await Account.findAll({
            where:{
                email: req.body.email
            }
        })
        if(!account){
            return  res.status(401).json({msg: "Akun tidak terdaftar!!"})
        }

        const match = await bcrypt.compare(req.body.password, account[0].password)
        if(!match) return res.status(400).json({msg: "Username atau password salah"})
        const accountId = account[0].id
        const username = account[0].username
        const email = account[0].email
        const accessToken = jwt.sign({accountId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({accountId, username, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await Account.update({refresh_token: refreshToken}, {
            where:{
                id: accountId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ msg: 'Login Berhasil', access_token: accessToken, account_info: account })
    } catch (error) {
        res.status(500).json({msg:"Terjadi kesalahan saat Login!!"})
    }
}

export const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const account = await Account.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!account[0]) return res.status(204);
    const accountId = account[0].id
    await Account.update({ refresh_token: null}, {
        where:{
            id: accountId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}