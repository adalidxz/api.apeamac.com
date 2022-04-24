import * as sql from 'mssql';
import moment from 'moment';
import { config } from '../settings/dbconfig';

export const deleteProducto = async (idProducto) => {
    const query = `UPDATE Productos SET Active=0WHERE idProducto=${idProducto}`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}
export const updateProducto = async (idProveedor, Producto, Descripcion, Codigo, idProducto)=>{
    const query = `UPDATE Productos SET idProveedor=${idProveedor}, Producto='${Producto}', Descripcion='${Descripcion}', Codigo='${Codigo}' WHERE idProducto=${idProducto}`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const registroVentaPorProducto = async (producto,idVenta)=>{
    const inserted = [];
    for (const key in producto) {
        if (Object.hasOwnProperty.call(producto, key)) {
            const val = producto[key];
            const query = `INSERT INTO RegistroVentaProductos VALUES(${val.idProducto}, ${idVenta}, ${parseInt(val.Cantidad)}, '${val.Costo}', ${(parseInt(val.Cantidad)*val.Costo)}, 1);`;
            try {
                const pool = await sql.connect(config);
                const data = await pool.request().query(query);
                const inventario = await saveInventario(val.idProducto, parseInt(val.Cantidad),2);
                inserted.push({inserted: data.rowsAffected, inventario})
            } catch (error) {
                console.log(error);
                inserted.push({});
            }
        }
    }
    return inserted
}

export const registrarVenta = async (productos,total,efectivo)=>{
    let totalProductos = productos.map(e=>parseInt(e.Cantidad));
    totalProductos = (totalProductos.length > 1 ? totalProductos.reduce((a,b)=>a+b): totalProductos[0])
    const query = `INSERT INTO RegistroVenta VALUES(GETDATE(),${totalProductos},'${total}', 1); SELECT @@IDENTITY AS ID`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, venta: data.recordset };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const getProductByCode = async (codigo) => {
    const query = `SELECT * FROM V_Productos WHERE Codigo='${codigo}'`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, producto: data.recordset[0] };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}
export const getListTipoEntradasSalidas = async ()=>{
    const query = `SELECT * FROM V_TipoEntradaSalidas`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, tipoEntradas: data.recordset };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const saveInventario = async (idProducto, Cantidad, idTipoEntradaSalida)=>{
    const {producto} = await getProductoByID(idProducto);
    const newStock = (producto.Stock ? (idTipoEntradaSalida == 2 ? producto.Stock - parseInt(Cantidad) : producto.Stock + parseInt(Cantidad))  : parseInt(Cantidad));
    const query = `IF NOT EXISTS (SELECT * FROM Inventario WHERE idProducto=${idProducto})
                    BEGIN
                        INSERT INTO Inventario VALUES(${idProducto}, ${(newStock<0 ? 0 : newStock)},1);
                    END
                ELSE
                    BEGIN
                        UPDATE Inventario SET Stock=${(newStock<0 ? 0 : newStock)} WHERE idProducto=${idProducto}
                    END`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, entradas: data.recordset || data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}
export const saveRegistroEntrada = async (Cantidad, idTipoPago, Costo, idProducto, idTipoEntradaSalida) =>{
    const query = `INSERT INTO Entradas VALUES(${idProducto},${(idTipoEntradaSalida == 1 ? idTipoPago : "NULL")},${(idTipoEntradaSalida == 1 ? `'${Costo}'` : "NULL")},'${Cantidad}','${moment().format("Y-MM-DD HH:mm:ss")}',1,${idTipoEntradaSalida})`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, productos: data.rowsAffected };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}

export const getListEntradasRegistro = async () => {
    const query = `SELECT * FROM V_EntradasProducto`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, entradas: data.recordset };
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
export const getProductoByID = async (idProducto) => {
    const query = `SELECT * FROM V_Productos WHERE idProducto=${idProducto}`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, producto: data.recordset[0] };
    } catch (error) {
        console.log(error);
        return { state: false, message: error };
    }
}
export const getTiposPagos = async () => {
    const query = `SELECT * FROM V_TipoPagos`;
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query(query);
        return { state: true, tipoPagos: data.recordset };
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