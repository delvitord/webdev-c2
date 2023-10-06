import express from "express";
import { createData_diri, deleteData_diri, getData_diri, getData_diriById, getData_diriByIdWithChild, updateData_diri } from "../controllers/DataDiriController.js";
import { createPendidikan, deletePendidikan, getPendidikan, getPendidikanById, updatePendidikan } from "../controllers/PendidikanController.js";
import { createSkill, deleteSkill, getSkill, getSkillById, updateSkill } from "../controllers/SkillController.js";
import { createGaleri, deleteGaleri, getGaleri, getGaleriById, updateGaleri } from "../controllers/GaleriController.js";
import { createOrganisasi, deleteOrganisasi, getOrganisasi, updateOrganisasi, getOrganisasiById } from "../controllers/OrganisasiController.js";
import { createPortofolio, deletePortofolio, getPortofolio, getPortofolioById, updatePortofolio } from "../controllers/PortofolioController.js";
import { Login, Logout, Register, getAccount} from "../controllers/AccountController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// CRUD DATA DIRI
router.get("/:account/data_diri", getData_diri);
router.get("/:account/data_diri/:id", getData_diriById);
router.get("/:account/data_diri_full/:id", getData_diriByIdWithChild);
router.post("/:account/data_diri", createData_diri);
router.patch("/:account/data_diri/:id", updateData_diri);
router.delete("/:account/data_diri/:id", deleteData_diri);

// CRUD PENDIDIKAN
router.get("/datadiri/:dataDiriId/pendidikan", getPendidikan);
router.get("/datadiri/:dataDiriId/pendidikan/:id", getPendidikanById);
router.post("/datadiri/:dataDiriId/pendidikan", createPendidikan);
router.patch("/datadiri/:dataDiriId/pendidikan/:id", updatePendidikan);
router.delete("/datadiri/:dataDiriId/pendidikan/:id", deletePendidikan);

// CRUD ORGANISASI
router.get("/datadiri/:dataDiriId/organisasi", getOrganisasi);
router.get("/datadiri/:dataDiriId/organisasi/:id", getOrganisasiById);
router.post("/datadiri/:dataDiriId/organisasi", createOrganisasi);
router.patch("/datadiri/:dataDiriId/organisasi/:id", updateOrganisasi);
router.delete("/datadiri/:dataDiriId/organisasi/:id", deleteOrganisasi);

// LOGIN
router.get("/admin", verifyToken, getAccount);
router.get("/admin/:id", getAccount);
router.post("/admin", Register);
router.post("/login", Login);
router.get("/admin/token", refreshToken);
router.delete("/logout", Logout);

// SKILL
router.get("/datadiri/:dataDiriId/skill", getSkill); 
router.get("/datadiri/:dataDiriId/skill/:id", getSkillById);
router.post("/datadiri/:dataDiriId/skill", createSkill); 
router.patch("/datadiri/:dataDiriId/skill/:id", updateSkill);
router.delete("/datadiri/:dataDiriId/skill/:id", deleteSkill);

// GALERI
router.get("/datadiri/:dataDiriId/galeri", getGaleri);
router.get("/datadiri/:dataDiriId/galeri/:id", getGaleriById);
router.post("/datadiri/:dataDiriId/galeri", createGaleri);
router.patch("/datadiri/:dataDiriId/galeri/:id", updateGaleri);
router.delete("/datadiri/:dataDiriId/galeri/:id", deleteGaleri);

// Portofolio
router.get("/datadiri/:dataDiriId/portofolio", getPortofolio);
router.get("/datadiri/:dataDiriId/portofolio/:id", getPortofolioById);
router.post("/datadiri/:dataDiriId/portofolio", createPortofolio);
router.patch("/datadiri/:dataDiriId/portofolio/:id", updatePortofolio);
router.delete("/datadiri/:dataDiriId/portofolio/:id", deletePortofolio);

export default router;
