# e-commerce_React
 Here is my first e-commerce shop developed with React.js

# Run
cd .\myshop\
npm run dev

# Data
A small React project that is working in Vite for faster development.

# LABS
 # LAB 5: Redux - Redux Toolkit
 Comentamos todo lo relacionado con el productContext. Vamos a pasar a utilizar estado global con Redux Toolkit.
 No queremos perder funcionalidad en cuanto a gestiones de errores, ni en cuanto a componentes visuales mostrados en tiempo de espera.
 - Creamos Store y Reducers.
 - Creamos Thunks para manipular los productos con el método createAsyncThunk().
 - Creamos un productSlice con los casos correnspondientes a los thunks, para manipilar los tres estados, fullfiled, pending, rejected.
 - Para la solicitudes a API he creado cuatro acciones o funciones (middleware) que solamente manipulan peticiones CRUD. -> Estas funciones van a ser llamadas desde los Thunks correspondientes.
