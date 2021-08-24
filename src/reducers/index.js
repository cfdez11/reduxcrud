//Este index va a combinar todos los reducers de la aplicacion
import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
});