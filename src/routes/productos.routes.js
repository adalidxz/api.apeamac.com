import { Router } from "express";
import * as productosController from "../controllers/productos.controller"
// import { verifyToken } from '../controllers/auth.controller'
const router = Router();

router.get("/list", productosController._getListProductos);

router.post("/save", productosController._guardarNuevoProduto);



module.exports = router;