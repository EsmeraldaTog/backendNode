//import testProducts from "../../data/fs/ProductFile.js";


import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";
import { create,read,readOne,update,remove} from "../../controllers/products.controller.js";



export default class ProductsRouter extends CustomRouter {
  init() {
    // Endpoint para creacion de productos
this.create( "/", ["ADMIN", "PREM"], passport.authenticate("jwt", { session: false }), create);

// // obtener todos los productos
this.read("/", ["PUBLIC"], read);

    // //obtener un producto
this.read("/:pid", ["PUBLIC"], readOne);
    // // actualizar un producto
this.update("/:pid", ["ADMIN"], update);
 // // eliminar un producto
this.destroy("/:pid", ["ADMIN"], remove);
  }
}
