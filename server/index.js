import express from "express";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const app = express();
const PORT=8080;



//obliga al servidor a utilizar la funcion encargada de recibir URL complejas
//me habilita el manejo de queries (consultas) y params (parámetros)

app.listen(PORT, ()=> {

console.log("app listen on port "+ PORT)});

//middlewares: son funciones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",router);
app.use(errorHandler)
app.use(pathHandler)


// END POINTS products


