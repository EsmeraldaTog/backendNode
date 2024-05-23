import { existsSync, writeFileSync, readFileSync, promises } from "fs";


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

  async create(data) {
    try {
      

      UserManager.#users.push(data);
      await promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#users, null, 2),
        "utf-8"
      );
      // console.log(` Usuario with ID: ${user.id}`);
      return data;
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
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readOne(id) {
    try {
      const userID = await UserManager.#users.find((user) => user._id === id);
      if (userID) {
        console.log("User found with id " + userID._id);
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
      const userId = await this.readOne(id);
      if (!userId) {
        return "No se encontro el Usuario";
      } else {
        const users = UserManager.#users.filter((user) => user._id !== id);
        UserManager.#users = users;

        await promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2),
          "utf-8"
        );
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(uid, data) {
    try {
      const userUpdate = await this.readOne(uid);

      if (!userUpdate) {
        throw new Error(`User  Not Found`);
      }
      for (const key in data) {
        userUpdate[key] = data[key];
      }
      // actualizar la matriz orders
      await promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#users, null, 2),
        "utf-8"
      );
      //console.log(`Order with ID: ${order.id}`);
      console.log(userUpdate);
      return userUpdate;
    } catch (error) {
      throw error;
    }
  }

  
  async readByEmail({email}) {
    try {
      const one = await UserManager.#users.find((each) => each.email === email);
      if (!one) {
        return null;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }



}
const testUsers = new UserManager("./src/data/fs/files/fileUsers.json");

export default testUsers;
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
