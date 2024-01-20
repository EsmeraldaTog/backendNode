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

  create(title, photo, price, stock) {
    return new Promise((resolve, reject) => {
      try {
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
          .then(() => {
            console.log(`Registro exitoso del producto con ID: ${product.id}`);
            resolve(product);
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

  read() {
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
      const productId=ProductManager.#products.find(product => product.id===id)
      if(!productId){
        return ('No se encontro el producto');
      }else{
        const products = ProductManager.#products.filter(
          (product) => product.id !== productId
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
      return next(error)
    }
  }

  async update(pid,data) {
    try {
      console.log('PID:', pid);
      console.log('Data:', data);
      const productIndex = ProductManager.#products.findIndex(
        (product) => product.id === pid
      );

      if (productIndex=== -1) {
        throw new Error(`Product con ID ${pid} no encontrado`);
      }

      // Crear un nuevo objeto de orden con las propiedades actualizadas
      const productUpdate = {
        ...ProductManager.#products[productIndex],
        ...data
      };
      // Actualizar la matriz #orders con el nuevo objeto de orden
      ProductManager.#products[productIndex]= productUpdate;
      await promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2),
        "utf-8"
      );
      //console.log(`Order with ID: ${order.id}`);
      console.log(`Producto actualizado:`, productUpdate);
      return productUpdate
    } catch (error) {
      
      return next(error)
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
