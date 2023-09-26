import express from "express";
import { createData_diri, deleteData_diri, getData_diri, getData_diriById, updateData_diri } from "../controllers/DataDiriController.js";
import { createPendidikan, deletePendidikan, getPendidikan, getPendidikanById, updatePendidikan } from "../controllers/PendidikanController.js";
import { createSkill, deleteSkill, getSkill, getSkillById, updateSkill } from "../controllers/SkillController.js";
import { createGaleri, deleteGaleri, getGaleri, getGaleriById, updateGaleri } from "../controllers/GaleriController.js";
import { createOrganisasi, deleteOrganisasi, getOrganisasi, updateOrganisasi, getOrganisasiById } from "../controllers/OrganisasiController.js";
import { createPortofolio, deletePortofolio, getPortofolio, getPortofolioById, updatePortofolio } from "../controllers/PortofolioController.js";
import { Login, Logout, Register, getAccount } from "../controllers/AccountController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// CRUD DATA DIRI
router.get("/data_diri", getData_diri);
router.get("/data_diri/:id", getData_diriById);
router.post("/data_diri", createData_diri);
router.patch("/data_diri/:id", updateData_diri);
router.delete("/data_diri/:id", deleteData_diri);

// CRUD PENDIDIKAN
router.get("/datadiri/:dataDiriI/pendidikan", getPendidikan);
router.get("/datadiri/:dataDiriI/pendidikan/:id", getPendidikanById);
router.post("/datadiri/:dataDiriI/pendidikan", createPendidikan);
router.patch("/datadiri/:dataDiriI/pendidikan/:id", updatePendidikan);
router.delete("/datadiri/:dataDiriI/pendidikan/:id", deletePendidikan);

// CRUD ORGANISASI
router.get("/datadiri/:dataDiriI/organisasi", getOrganisasi);
router.get("/datadiri/:dataDiriI/organisasi/:id", getOrganisasiById);
router.post("/datadiri/:dataDiriI/organisasi", createOrganisasi);
router.patch("/datadiri/:dataDiriI/organisasi/:id", updateOrganisasi);
router.delete("/datadiri/:dataDiriI/organisasi/:id", deleteOrganisasi);

// LOGIN
router.get("/admin", verifyToken, getAccount);
router.post("/admin", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// SKILL
router.get("/datadiri/:dataDiriId/skill", getSkill); 
router.get("/datadiri/:dataDiriId/skill/:id", getSkillById);
router.post("/datadiri/:dataDiriId/skill", createSkill); 
router.patch("/datadiri/:dataDiriId/skill/:id", updateSkill);
router.delete("/datadiri/:dataDiriId/skill/:id", deleteSkill);

// GALERI
router.get("/datadiri/:dataDiriI/galeri", getGaleri);
router.get("/datadiri/:dataDiriI/galeri/:id", getGaleriById);
router.post("/datadiri/:dataDiriI/galeri", createGaleri);
router.patch("/datadiri/:dataDiriI/galeri/:id", updateGaleri);
router.delete("/datadiri/:dataDiriI/galeri/:id", deleteGaleri);

// Portofolio
router.get("/datadiri/:dataDiriI/portofolio", getPortofolio);
router.get("/datadiri/:dataDiriI/portofolio/:id", getPortofolioById);
router.post("/datadiri/:dataDiriI/portofolio", createPortofolio);
router.patch("/datadiri/:dataDiriI/portofolio/:id", updatePortofolio);
router.delete("/datadiri/:dataDiriI/portofolio/:id", deletePortofolio);

export default router;
