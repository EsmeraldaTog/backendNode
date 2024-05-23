import fs from "fs";

import { existsSync, writeFileSync, readFileSync, promises } from "fs";

class OrderManager {
  static #orders = [];

  // static userExists(uid) {
  //   const path = "./src/data/fs/files/fileUsers.json";
  //   return new Promise((resolve, reject) => {
  //     fs.promises
  //       .readFile(path, "utf-8")
  //       .then((users) => {
  //         const dataObject = JSON.parse(users);
  //         const userFound = dataObject.find((user) => user._id === uid);
  //         console.log(userFound)
  //         if (userFound) {
  //           console.log(userFound);
  //           resolve(userFound);
  //         } else {
  //           console.log(`User with id ${uid} not found`);
  //         }
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }

  static productExists(pid) {
    const path = "./src/data/fs/files/product.json";
    return new Promise((resolve, reject) => {
      fs.promises
        .readFile(path, "utf-8")
        .then((data) => {
          const dataObject = JSON.parse(data);
          const productFound = dataObject.find((product) => product._id === pid);

          if (productFound) {
            console.log(productFound);
            resolve(productFound);
          } else {
            console.log(`Product with id ${pid} not found`);
            reject(new Error(`Product with id ${pid} not found`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  init() {
    const existFile = existsSync(this.path);
    if (!existFile) {
      writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrderManager.#orders = JSON.parse(readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.pid || !data.uid || !data.quantity || !data.state) {
        throw new Error("pid, uid, quantity , state are required");
      }

      // await OrderManager.userExists(data.uid);
      await OrderManager.productExists(data.pid);

   OrderManager.#orders.push(data);

      await promises.writeFile(
        this.path,
        JSON.stringify(OrderManager.#orders, null, 2),
        "utf-8"
      );

      return data;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (OrderManager.#orders.length === 0) {
        throw new Error("There arent orders");
      } else {
        console.log(OrderManager.#orders);
        return OrderManager.#orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readByUser(uid) {
    try {
      const orderByUser = OrderManager.#orders.filter((user) => user.uid == uid);
      if (orderByUser) {
        console.log(`Orders by User ${uid}: \n`, orderByUser);
        
        return orderByUser;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(oid, quantity, state) {
    try {
      const orderIndex = OrderManager.#orders.findIndex(
        (order) => order._id === oid
      );

      if (orderIndex === -1) {
        throw new Error(`Orden con ID ${oid} no encontrada`);
      }

      // Crear un nuevo objeto de orden con las propiedades actualizadas
      const updatedOrder = {
        ...OrderManager.#orders[orderIndex],
        quantity,
        state,
      };
      // Actualizar la matriz #orders con el nuevo objeto de orden
      OrderManager.#orders[orderIndex] = updatedOrder;
      await promises.writeFile(
        this.path,
        JSON.stringify(OrderManager.#orders, null, 2),
        "utf-8"
      );
      //console.log(`Order with ID: ${order.id}`);
      console.log(updatedOrder);
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async destroy(oid) {
    try {
      const idOrder = OrderManager.#orders.find(order => order._id === oid);
  
      if (idOrder) {
        const orders = OrderManager.#orders.filter(order => order._id !== oid);
        OrderManager.#orders = orders;
  
        await promises.writeFile(
          this.path,
          JSON.stringify(OrderManager.#orders, null, 2),
          "utf-8"
        );
  
        console.log(`Order with id ${oid} has been deleted`);
        return idOrder;
      } else {
        throw new Error(`Order with ID ${oid} not found`);
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }}
  
const testOrders = new OrderManager("./src/data/fs/files/orders.json");

// testOrders.create("56da5837c1b8706d6fc61a8b","83405636c56bf21e725a0bc6ca29c52d",5,"pendiente")
// testOrders.create("56da5837c1b8706d6fc61a8b","62bdbe8314f2e9b0dcd517b7ce708ca0",5,"pendiente")

// testOrders.read();
//testOrders.readByUser("62bdbe8314f2e9b0dcd517b7ce708ca0")
// testOrders.update("kku", 10, "pagado");
//testOrders.destroy("7aec5722976719eea9e312");

export default testOrders;

