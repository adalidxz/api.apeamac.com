import * as helpers from '../helpers/productos.help'

export const _guardarNuevoProduto = async(req, res)=>{
    const { Producto,Descripcion,Codigo, idProveedor, Costo} = req.body;
    try {
        const data = await helpers.guardarNuevoProduto(Producto, Descripcion, Codigo, idProveedor, Costo);
        res.json(data);
    } catch (error) {
        res.send({ state: false, messg: error });
    }
}

export const _getListProductos = async (req, res) => {
    try {
        const data = await helpers.getListProductos();
        res.json(data); 
    } catch (error) {
        res.send({state:false, messg:error});     
    }

   
}