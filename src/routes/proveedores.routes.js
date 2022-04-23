import { Router } from "express";
import * as proveedoresController from "../controllers/proveedores.controller"
// import { verifyToken } from '../controllers/auth.controller'
const router = Router();

router.get("/list", proveedoresController._getListProveedores);
router.post("/save", proveedoresController._guardarNuevoProveedores);



module.exports = router;