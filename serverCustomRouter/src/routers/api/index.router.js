
import ProductsRouter from "./products.router.js";
import UsersRouter from "./users.router.js";
import SessionsRouter from "./session.router.js";
import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./orders.router.js";


const productsRouter= new ProductsRouter();
const ordersRouter = new OrdersRouter();
const usersRouter=new UsersRouter();
const sessionsRouter= new SessionsRouter();

export default class ApiRouter extends CustomRouter{
init(){
    this.router.use("/products",productsRouter.getRouter())
    this.router.use("/users",usersRouter.getRouter())
    this.router.use("/orders",ordersRouter.getRouter())
    this.router.use("/sessions",sessionsRouter.getRouter())
}
}



