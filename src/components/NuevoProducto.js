import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlertaAction } from '../actions/alertaActions';
import { ocultarAlertaAction } from '../actions/alertaActions';
//accedemos a la propiedad history de props para redireccionar la pagina con react router dom, lo tienen todos los componentes que 
//esten en el routing de react router dom
const NuevoProducto = ({history}) => {

    //state del componente 
    const [ nombre, setNombre ] = useState('');
    const [ precio, setPrecio ] = useState(0);

    //agrega el producto que llama al action crearNuevoProductoAction
    //Para crear esta funcion hay que utilizar dos hooks de redux, useDispatch nos sirve para mandar 
    //ejecutar las acciones que tengamos y useSelector es una forma en la que accedemos al state dentro del componente

    //utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error );
    const alerta = useSelector( state => state.alerta.alerta);

    //llamamos el action de productoaction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    //cuando el usuario haga el submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombre.trim() === '' || precio<=0){
            const alerta ={
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch( mostrarAlertaAction(alerta) );
            return;
        }
        //si no hay errores 
        dispatch( ocultarAlertaAction() );
        
        //crear el nuevo producto
        //clave valor al ser el mismo nombre se puede obviar precio:precio
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar al home
        history.push('/');
        
    }
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }
                        <form
                            onSubmit={ submitNuevoProducto }
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={ precio }
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger text-center p-2 mt-3">Hubo un error</p> : null }

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;