import { existsSync, writeFileSync, readFileSync, promises } from "fs";
import { randomBytes } from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const existFile = existsSync(this.path);
    if (!existFile) {
      writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  create(data) {
    return new Promise((resolve, reject) => {
      try {
        // const product = {
        //   id: randomBytes(12).toString("hex"),
        //   title: data.title,
        //   photo: data.photo,
        //   price: data.price,
        //   stock: data.stock,
        // };

        ProductManager.#products.push(data);

        promises
          .writeFile(
            this.path,
            JSON.stringify(ProductManager.#products, null, 2),
            "utf-8"
          )
          .then(() => {
            console.log(`Registro exitoso del producto con ID: ${data._id}`);
            resolve(data);
          })
          .catch((error) => {
            console.error(error.message);
            reject(error);
          });
      } catch (error) {
        console.error(error.message);
        reject(error);
      }
    });
  }

  //pendiente mmodificar y agregar filtros, paginacion y ordenamiento
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There aren't any document");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const productFound = ProductManager.#products.find(
        (product) => product._id === id
      );
      if (productFound) {
        console.log("Product found with id " + productFound._id);
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
      const productId = await this.readOne(id);
      if (!productId) {
        return "No se encontro el producto";
      } else {
        const products = ProductManager.#products.filter(
          (product) => product._id !== id
        );
        ProductManager.#products = products;
        await promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2),
          "utf-8"
        );

        return productId;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(pid, data) {
    try {
      const productUpdate = await this.readOne(pid);

      if (!productUpdate) {
        throw new Error(`Product  Not Found`);
      }
      for (const key in data) {
        productUpdate[key] = data[key];
      }

      // Actualizar la matriz #orders con el nuevo objeto de orden

      await promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2),
        "utf-8"
      );
      //console.log(`Order with ID: ${order.id}`);
      console.log(`Producto actualizado:`, productUpdate);
      return productUpdate;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const docEmail = await this.readOne(email);
      /*if (!docEmail || docEmail.length === 0) {
        const error = new Error(`User with email ${email} not found`);
        error.statusCode = 404;
        throw error;
      }*/
      return docEmail;
    } catch (error) {
      throw error;
    }
  }
}

const testProducts = new ProductManager("./src/data/fs/files/product.json");

export default testProducts;
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
