import * as sql from 'mssql';
import { config } from '../settings/dbconfig';


export const saveNewProveedor = async(RazonSocial,Direccion,RFC,Actividad) => {
    const query = `INSERT INTO Proveedores VALUES('${RazonSocial}','${Direccion}', '${RFC}','${Actividad}',1)`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, proveedores: data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const getListProveedores = async () => {
    const query = `SELECT * FROM V_PROVEEDORES`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, proveedores: data.recordset };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}