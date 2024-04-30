import propsUsers from "../../middlewares/propsUsers.mid.js";
import CustomRouter from "../CustomRouter.js";
import { create, destroy, read, readByEmail, readOne, update } from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter{

    init(){

// Endpoint para creacion de users
this.create("/",["PUBLIC"],create);

this.read("/",["USER","ADMIN","PREM"],read )

this.read("/:uid",["USER","ADMIN"],readOne)

this.read("/:email", ["USER","ADMIN"], readByEmail)
this.update("/:uid",["USER","ADMIN"], update)
this.destroy("/:uid", ["USER", "PREM"], destroy);


    }

}







