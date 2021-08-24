import React, { useState, useEffect } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router';
const EditarProducto = () => {

    
    //nuevo state de producto
    const [ producto, guardarProducto ] = useState({
        nombre:'',
        precio: ''
    });

    const history = useHistory();
    const dispatch = useDispatch(); 

    //Producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);

    useEffect(() => {
        
        guardarProducto(productoeditar);

    }, [productoeditar]);

    const { nombre, precio } = producto;

    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }
    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch( editarProductoAction(producto) );
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;