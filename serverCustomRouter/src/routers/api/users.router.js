import propsUsers from "../../middlewares/propsUsers.mid.js";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";
import { create, destroy, read, readByEmail, readOne, update } from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter{

    init(){

// Endpoint para creacion de users
this.create("/",["PUBLIC"],create);

this.read("/",["PUBLIC"],read )

this.read("/:uid",["USER","ADMIN","PREM"],readOne)

this.read("/:email", ["USER","ADMIN"], readByEmail)
this.update("/:uid",["USER","ADMIN"], update)
this.destroy("/:uid", ["USER", "PREM"], destroy);


    }

}







