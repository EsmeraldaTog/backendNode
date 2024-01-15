import { existsSync, writeFileSync, readFileSync, promises } from "fs";
import { randomBytes } from "crypto";

class UserManager {
  static #users = [];

  init() {
    const existFile = existsSync(this.path);
    if (!existFile) {
      writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(readFileSync(this.path, "utf-8"));
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(name, photo, email) {
    try {
       
        const user = {
          id: randomBytes(16).toString("hex"),
          name,
          photo,
          email,
        };

        UserManager.#users.push(user);
        await promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2),
          "utf-8"
        );
        console.log(` Usuario with ID: ${user.id}`);
        return user;
      
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("There arent users");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
        //   const readProducts = await fs.promises.readFile(this.path, "utf-8");
        //   const ProductsObject = JSON.parse(readProducts);

        //   console.log(ProductsObject);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readOne(id) {
    try {
      const userID = UserManager.#users.find((product) => product.id === id);
      if (userID) {
        console.log(userID);
        return userID;
      } else {
        throw new Error("The user does not exist");
      }
      //   const productsObject = JSON.parse(readProducts);
      //   const productFound = productsObject.find((product) => product.id == id);
      //   console.log(productFound);
    } catch (error) {
      console.log(error.message);
      //return error.message;
    }
  }

  async destroy(id) {
    try {
      const users = UserManager.#users.filter(
        (product) => product.id !== id
      );
      UserManager.#users = users;

     await promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#users, null, 2),
        "utf-8"
      );
      console.log(UserManager.#users);
      return UserManager.#users;


    } catch (error) {
        console.log(error.message);
        return error.message;
      }
    }

    async update(uid,data) {
      try {
        const userIndex = UserManager.#users.findIndex(
          (user) => user.id === uid
        );
  
        if (userIndex=== -1) {
          throw new Error(`User con ID ${uid} no encontrada`);
        }
  
        // Crear un nuevo objeto de orden con las propiedades actualizadas
        const updatedUser = {
          ...UserManager.#users[userIndex],
          ...data
        };
        // Actualizar la matriz #orders con el nuevo objeto de orden
        UserManager.#users[userIndex] = updatedUser;
        await promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2),
          "utf-8"
        );
        //console.log(`Order with ID: ${order.id}`);
        console.log(updatedUser);
      } catch (error) {
        console.error(error.message);
        return error.message;
      }
    }
  


}
const testUser = new UserManager("./src/data/fs/files/fileUsers.json");

export default testUser;
//testUser.update("62bdbe8314f2e9b0dcd517b7ce708ca0",{name:"Lucia Cortes"})
// testUser.create(
//   "Esmeralda Torres",
//   "http://dummyimage.com/196x100.png/cc0000/ffffff",
//   "esmeraldatorres.2305@gmail.com"
// );
// testUser.create(
//   "Elvi Martinez",
//   "http://dummyimage.com/196x100.png/cc0000/ffffff",
//   "elvis.12@hotmail.com"
// );
// testUser.read();
// testUser.readOne(20);
