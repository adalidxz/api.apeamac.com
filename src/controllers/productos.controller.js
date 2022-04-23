import * as helpers from '../helpers/productos.help'


export const _saveVenta = async(req,res)=>{
    const { productos, total, efectivo } = req.body
    try {
        const data = await helpers.registrarVenta(productos,total, efectivo);

        if(data.venta.length > 0){
            const registroByProducto = await helpers.registroVentaPorProducto(productos, data.venta[0].ID);
            res.json({...data,registroByProducto});
        }else{
            res.json(data);
        }
        
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _getProductByCode = async (req, res) => {
    const {id} = req.params
    try {
        const data = await helpers.getProductByCode(id);
        res.json(data);
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _getTiposEntradas = async(re, res)=>{
    try {
        const data = await helpers.getListTipoEntradasSalidas();
        res.json(data);
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _saveRegistroEntrada = async(req,res)=>{
    const { Cantidad, idTipoPago, Costo, idProducto, idTipoEntradaSalida } = req.body;
    try {
        const data = await helpers.saveRegistroEntrada(Cantidad, idTipoPago, Costo, idProducto, idTipoEntradaSalida);
        if(data.state === true){
            const inventario = helpers.saveInventario(idProducto, Cantidad, idTipoEntradaSalida);
            res.json({...data, inventario});
        }
        
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _getRegistroEntradas = async(req, res)=>{
    try {
        const data = await helpers.getListEntradasRegistro();
        res.json(data);
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _getTiposPagos = async(req,res)=>{
    try {
        const data = await helpers.getTiposPagos();
        res.json(data);
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}
export const _guardarNuevoProduto = async(req, res)=>{
    const { Producto,Descripcion,Codigo, idProveedor, Costo} = req.body;
    try {
        const data = await helpers.guardarNuevoProduto(Producto, Descripcion, Codigo, idProveedor, Costo);
        res.json(data);
    } catch (error) {
        res.json({ state: false, messg: error });
    }
}

export const _getListProductos = async (req, res) => {
    try {
        const data = await helpers.getListProductos();
        res.json(data); 
    } catch (error) {
        res.json({state:false, messg:error});     
    }

   
}