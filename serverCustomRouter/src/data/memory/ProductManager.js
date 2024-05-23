class ProductManager {
  #products = [];

  constructor() {}

  create(data) {
    try {
      const product = {
        id: this.#products.length === 0 ? 1 : this.#products.length + 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.#products.push(product);
      //console.log(this.#products);
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      if (this.#products.length === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      } else {
        return this.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      let productFound = this.#products.find((product) => product.id === id);
      if (productFound) {
        return productFound;
      } else {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(pid, data) {
    try {
      const one = this.readOne(pid);
     
      for (let each in data) {
        one[each] = data[each];
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      EventsManager.#products = EventsManager.#products.filter(
        (each) => each.id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const testProducts = new ProductManager();
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
// testProducts.read();
// testProducts.readOne(1);
export default testProducts
