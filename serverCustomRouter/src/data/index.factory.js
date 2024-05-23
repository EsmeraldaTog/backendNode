import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/db.js";

const enviroment = argsUtil.env;

let dao = {};

switch (enviroment) {
  case "test":
    //se utilizara la importacion dinamica hacia la persistencia en memoria
    console.log("Memory Connected");
    const { default: productsMemory } = await import(
      "./memory/ProductManager.js"
    );
    const { default: usersMemory } = await import("./memory/UserManager.js");
    dao = { testProducts: productsMemory, testUser: usersMemory };
    break;
  case "dev":
    //se utilizara la importacion dinamica hacia la persistencia en FS
    console.log("File System connected");
    const { default: productsFs } = await import("./fs/ProductFile.js");
    const { default: usersFs } = await import("./fs/UserFiles.js");
    const { default: ordersFs } = await import("./fs/OrdersFile.js");
    dao = {
      testProducts: productsFs,
      testUsers: usersFs,
      testOrders: ordersFs,
    };
    break;

  case "prod":
    dbConnection();
    console.log("MongoDB Connected");
    const { default: productsMongoDB } = await import("./mongo/products.mongo.js");
    const { default: usersMongoDB } = await import("./mongo/users.mongo.js");
    const { default: ordersMongoDB } = await import("./mongo/orders.mongo.js");
    dao = {
      testProducts: productsMongoDB,
      testUsers: usersMongoDB,
      testOrders: ordersMongoDB,
    };
    break;
  default:
    break;
}

export default dao;
