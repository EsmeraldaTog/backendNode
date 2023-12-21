const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];

  init() {
    const existFile = fs.existsSync(this.path);
    if (!existFile) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(name, photo, email) {
    try {
      if (!name || !photo || !email) {
        throw new Error("Name, photo, email are required");
      } else {
        const user = {
          id: crypto.randomBytes(16).toString("hex"),
          name,
          photo,
          email,
        };

        UserManager.#users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2),
          "utf-8"
        );
        console.log(` Usuario with ID: ${user.id}`);
        return user;
      }
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
}
const testUser = new UserManager("./data/fileUsers.json");
testUser.create(
  "Esmeralda Torres",
  "http://dummyimage.com/196x100.png/cc0000/ffffff",
  "esmeraldatorres.2305@gmail.com"
);
testUser.create(
  "Elvi Martinez",
  "http://dummyimage.com/196x100.png/cc0000/ffffff",
  "elvis.12@hotmail.com"
);
testUser.read();
testUser.readOne(20);
