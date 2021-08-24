import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try{
            //Insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien actualiza el state
            dispatch( agregarProductoExito(producto) );

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        }catch(error){
            console.log(error);
            
            //Si hay un error cambia el state
            dispatch( agregarProductoError(true) );

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//Si el producto se guarda en la bd
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Funcion que descarga los productos de la BD
export function obtenerProductosAction(){
    return async (dispatch) => {

        dispatch( descargarProductos() );

        try{
            
            const respuesta = await clienteAxios.get('/productos');
            //console.log(respuesta.data);

            dispatch( descargarProductosExitosa(respuesta.data) );

        }catch(error){
            console.log(error);

            dispatch( descargarProductosError() );
        }
    
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {

        dispatch( obtenerProductoEliminar(id) );

        try{
            await clienteAxios.delete(`productos/${id}`);

            dispatch( eliminarProductoExito() );

            //si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se ha eliminado correctamente',
                'success'
            )
        }catch(error){
            console.log(error);

            dispatch( eliminarProductoError() );

        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id

});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//Colocar producto en edicion
export function obtenerProductoEditarAction(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditar(producto) );
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto() );
        try{
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            
            dispatch( editarProductoExito(producto) );

        }catch(error){
            console.log(error);
            dispatch( editarProductoError() );

        }
        
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
});