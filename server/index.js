import "dotenv/config.js"
import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import expressSession  from "express-session";
import { Server } from "socket.io"
//CONFIGURAR EL MOTOR DE PLANTILLAS DE HANDLEBARS
import { engine } from "express-handlebars";
import __dirname from "./utils.js";

//import router from "./src/routers/views/index.view.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import testProducts from "./src/data/fs/ProductFile.js";
import propsProducts from "./src/middlewares/propsProducts.mid.js";
import dbConnection from "./src/utils/db.js";
import session from "express-session";





//configuracion del servidor
const app = express();
const PORT=8080;
const httpServer=createServer(app);

// const socketServer= new Server(httpServer)
httpServer.listen(PORT, ()=> {

console.log("app listen on port "+ PORT)
dbConnection()

});


// // levantar servidor de socket on y palabra connection para habilitar el handshake
// socketServer.on('connection', (socket)=>{
//     console.log(socket.id)
// socket.emit("products", testProducts.read())
// socket.on("newproduct", async (data) => {
//     try {
//         propsProducts(data);
//       await testProducts.create(data.title, data.photo, data.price, data.stock);
//       socketServer.emit("products", await testProducts.read());
//     } catch (error) {
//       console.log(error);
//     }
//   });

// })




// configuracion del motor de plantillas y las vistas
app.engine("handlebars", engine());
//configuramos el motor elegido con el método set(), pasándole dos parámetros:
app.set("view engine","handlebars");
//nfiguramos la ruta donde estarán todas las plantillas, pasándole dos parámetros:
app.set('views', __dirname +"/src/views");

//middlewares: son funciones

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(
    expressSession({
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    }))

//endpoints

app.use("/",router);
app.use(errorHandler)
app.use(pathHandler)





