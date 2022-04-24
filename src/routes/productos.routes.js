import { Router } from "express";
import * as productosController from "../controllers/productos.controller"
// import { verifyToken } from '../controllers/auth.controller'
const router = Router();

router.get("/list", productosController._getListProductos);
router.get("/byCode/:id", productosController._getProductByCode);
router.get("/entradas/registro", productosController._getRegistroEntradas);


router.post("/save", productosController._guardarNuevoProduto);
router.post("/entradas/save", productosController._saveRegistroEntrada);
router.post("/venta/save", productosController._saveVenta);


router.put("/update/", productosController._updateProducto)
router.delete("/remove/:id", productosController._deleteProducto)

router.get("/tipopagos/list", productosController._getTiposPagos);
router.get("/tipoEntradas/list", productosController._getTiposEntradas);

module.exports = router;