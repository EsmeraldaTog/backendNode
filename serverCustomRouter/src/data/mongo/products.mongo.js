import MongoManager from "./manager.mongo.js";
import Product from "./models/product.model.js";

const testProducts= new MongoManager(Product);

export default testProducts