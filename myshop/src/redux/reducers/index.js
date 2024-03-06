// RootReducer que va a contener todos los reducers de la aplicación
import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    products: productReducer,
    // otros reducers (usuarios, productos...)
});
export default rootReducer;