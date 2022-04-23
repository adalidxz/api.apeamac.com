import * as sql from 'mssql';
import { config } from '../settings/dbconfig';

export const getListEntradasRegistro = async () => {
    const query = `SELECT * FROM V_EntradasProducto`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.recordset };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}
export const guardarNuevoProduto = async (Producto, Descripcion, Codigo, idProveedor, Costo) => {
    const query = `INSERT INTO Productos VALUES(${idProveedor},'${Producto}','${Descripcion}', '${Codigo}','${Costo}',1)`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const getListProductos = async ()=>{
    const query = `SELECT * FROM V_Productos`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.recordset };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}