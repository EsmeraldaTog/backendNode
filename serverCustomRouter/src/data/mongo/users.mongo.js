import MongoManager from "./manager.mongo.js";
import User from "./models/user.model.js";


const testUsers = new MongoManager(User);
export default testUsers