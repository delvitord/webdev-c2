import Account from "../models/AccountModel.js";
import jwt, { decode } from "jsonwebtoken"

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const account = await Account.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!account[0]) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.error("Refresh token tidak valid:", err.message);
          return res.sendStatus(403);
        }

        const accountId = account[0].id;
        const username = account[0].username;
        const email = account[0].email;
        const accessToken = jwt.sign(
          { accountId, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui token:", error);
    res.sendStatus(500); // Server error
  }
};


// export const refreshToken = async(req, res)=> {
//     try {
//         const refreshToken = req.cookies.refreshToken
//         if(!refreshToken) return res.sendStatus(401)
//         const account = await Account.findAll({
//             where:{
//                 refresh_token: refreshToken
//             }
//         })
//         if (!account[0])return  res.status(403)
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode)=>{
//             if(err) return res.sendStatus(403)
//             const accountId = account[0].id
//             const username = account[0].username
//             const email = account[0].email
//             const accessToken = jwt.sign({accountId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: '15s'
//             })
//             res.json({ accessToken })
//         })
//     } catch (error) {
        
//     }
// }