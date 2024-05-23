import MongoManager from "./manager.mongo.js";
import Order from "./models/orders.model.js";


const testOrders= new MongoManager(Order)
export default testOrders