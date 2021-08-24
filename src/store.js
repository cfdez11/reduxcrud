//Solo hay un store por app, y es el encargado de todo el state de la aplicacion completa
import { createStore, applyMiddleware, compose } from 'redux'; //se requiere applyMiddleware porque se va a usar thunk
import thunk from 'redux-thunk'; //thunk permite usar funciones asincronas
import reducer from './reducers'; //al no especificar coge el index.js

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__  !== 'undefined' ?  
                    window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;

