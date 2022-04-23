import * as helpers from '../helpers/proveedores.help'

export const _guardarNuevoProveedores = async (req, res) => {
    const { RazonSocial,Direccion,RFC,Actividad, idProveedor } = req.body;
    console.log(req.body);
    try {
        const data = await helpers.saveNewProveedor(RazonSocial,Direccion,RFC,Actividad, idProveedor);
        res.json(data);
    } catch (error) {
        res.send({ state: false, messg: error });
    }
}

export const _getListProveedores = async (req, res) => {
    try {
        const data = await helpers.getListProveedores();
        res.json(data);
    } catch (error) {
        res.send({ state: false, messg: error });
    }


}