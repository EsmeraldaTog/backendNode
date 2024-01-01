import { existsSync, writeFileSync, readFileSync, promises } from "fs";
import { randomBytes } from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const existFile = existsSync(this.path);
    if (!existFile) {
      writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(
        readFileSync(this.path, "utf-8")
      );
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  create(title, photo, price, stock) {
    try {
      if (!title || !photo || !price || !stock) {
        throw new Error("Title, photo, price, stock are required");
      } else {
        const product = {
          id: randomBytes(12).toString("hex"),
          title,
          photo,
          price,
          stock,
        };

        ProductManager.#products.push(product);

        promises
          .writeFile(
            this.path,
            JSON.stringify(ProductManager.#products, null, 2),
            "utf-8"
          )
          .then(() =>
            console.log(`Registro exitoso del producto con ID: ${product.id}`)
          )
          .catch((error) => console.log(error.message));
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    // return new Promise((resolve, reject) => {
    //     fs.promises.readFile(this.path, 'utf-8')
    //         .then(data => {
    //             const dataProducts = JSON.parse(data)
    //             console.log(dataProducts)
    //             resolve(dataProducts)
    //         })
    //         .catch(error => reject(error));
    // });
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There arent products");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const productFound = ProductManager.#products.find(
        (product) => product.id == id
      );
      if (productFound) {
        console.log("Product found with id " + productFound.id);
        return productFound;
      } else {
        throw new Error("Product Not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }

    //     return new Promise((resolve, reject) => {
    //         fs.promises.readFile(this.path, 'utf-8')
    //             .then(data => {
    //                 const dataObject=JSON.parse(data);
    //                 const productFound=dataObject.find(product => product.id == id);

    //                 if(productFound){
    //                     console.log(productFound);
    //                     resolve(productFound)
    //                 }
    //                 else{
    //                     console.log(`Product with id ${id} not found`)

    //                 }
    //             })
    //             .catch(error => reject(error));
    //         });
    //     }
  }
  async destroy(id) {
    try {
      const products = ProductManager.#products.filter(
        (product) => product.id !== id
      );
      ProductManager.#products = products;
     await  promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2),
        "utf-8"
      );
      console.log(ProductManager.#products);
      return ProductManager.#products;


    } catch (error) {
        console.log(error.message);
        return error.message;
      }
    }
  }

const testProducts = new ProductManager("./src/fs/files/product.json");

export default testProducts
// testProducts.create(
//   "Computadora Portatil",
//   "http://dummyimage.com/196x100.png/cc0000/ffffff",
//   8500,
//   5
// );
// testProducts.create(
//   "Mouse Inalambrico",
//   "http://dummyimage.com/196x100.png/cc0000/ffffff",
//   325,
//   6
// );

//testProducts.read();
//testProducts.readOne("c578583dfb31c0c17feef830");
//testProducts.destroy("3eab1aace171e87d8ae4bb0c")