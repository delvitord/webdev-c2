import express from "express";
import { createData_diri, deleteData_diri, getData_diri, getData_diriByIdWithChild, updateData_diri } from "../controllers/DataDiriController.js";
import { createPendidikan, deletePendidikan, getPendidikan, getPendidikanById, updatePendidikan } from "../controllers/PendidikanController.js";
import { createSkill, deleteSkill, getSkill, getSkillById, updateSkill } from "../controllers/SkillController.js";
import { createGaleri, deleteGaleri, getGaleri, getGaleriById, updateGaleri } from "../controllers/GaleriController.js";
import { createOrganisasi, deleteOrganisasi, getOrganisasi, updateOrganisasi, getOrganisasiById } from "../controllers/OrganisasiController.js";
import { createPortofolio, deletePortofolio, getPortofolio, getPortofolioById, updatePortofolio } from "../controllers/PortofolioController.js";
import { Login, Logout, Register, getAccount} from "../controllers/AccountController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// LOGIN

router.post("/login", Login);


router.use(verifyToken)

router.get("/admin/:id", getAccount);
router.post("/admin", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// CRUD DATA DIRI
router.get("/:data_diri", getData_diri);
router.get("/data_diri_full", getData_diriByIdWithChild);
router.post("/data_diri", createData_diri);
router.patch("/data_diri", updateData_diri);
router.delete("/data_diri", deleteData_diri);

// CRUD PENDIDIKAN
router.get("/datadiri/pendidikan", getPendidikan);
router.get("/datadiri/pendidikan/:id", getPendidikanById);
router.post("/datadiri/pendidikan", createPendidikan);
router.patch("/datadiri/pendidikan/:id", updatePendidikan);
router.delete("/datadiri/pendidikan/:id", deletePendidikan);

// CRUD ORGANISASI
router.get("/datadiri/organisasi", getOrganisasi);
router.get("/datadiri/organisasi/:id", getOrganisasiById);
router.post("/datadiri/organisasi", createOrganisasi);
router.patch("/datadiri/organisasi/:id", updateOrganisasi);
router.delete("/datadiri/organisasi/:id", deleteOrganisasi);



// SKILL
router.get("/datadiri/skill", getSkill); 
router.get("/datadiri/skill/:id", getSkillById);
router.post("/datadiri/skill", createSkill); 
router.patch("/datadiri/skill/:id", updateSkill);
router.delete("/datadiri/skill/:id", deleteSkill);

// GALERI
router.get("/datadiri/galeri", getGaleri);
router.get("/datadiri/galeri/:id", getGaleriById);
router.post("/datadiri/galeri", createGaleri);
router.patch("/datadiri/galeri/:id", updateGaleri);
router.delete("/datadiri/galeri/:id", deleteGaleri);

// Portofolio
router.get("/datadiri/portofolio", getPortofolio);
router.get("/datadiri/portofolio/:id", getPortofolioById);
router.post("/datadiri/portofolio", createPortofolio);
router.patch("/datadiri/portofolio/:id", updatePortofolio);
router.delete("/datadiri/portofolio/:id", deletePortofolio);

export default router;
