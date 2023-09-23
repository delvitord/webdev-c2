import express from "express";
import { 
    createData_diri,
    deleteData_diri,
    getData_diri, 
    getData_diriById, 
    updateData_diri
} from "../controllers/DataDiriController.js"
import { 
    createPendidikan,
    getPendidikan, 
    getPendidikanById, 
    updatePendidikan
} from "../controllers/PendidikanController.js";
import { Login, Logout, Register, getAccount } from "../controllers/AccountController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router()

// CRUD DATA DIRI
router.get('/data_diri', getData_diri)
router.get('/data_diri/:id', getData_diriById)
router.post('/data_diri', createData_diri)
router.patch('/data_diri:id', updateData_diri)
router.delete("/data_diri:id", deleteData_diri);


// CRUD PENDIDIKAN
router.get('/pendidikan', getPendidikan)
router.get("/pendidikan/:id", getPendidikanById);
router.post("/pendidikan", createPendidikan);
router.patch("/pendidikan:id", updatePendidikan);
router.delete("/pendidikan:id", updatePendidikan);


// LOGIN
router.get('/admin', verifyToken, getAccount)
router.post('/admin', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)




export default router

//tes