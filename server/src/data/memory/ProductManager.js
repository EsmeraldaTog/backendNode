class ProductManager {
    #products = [];
  
    constructor() {}
  
    create(title, photo, price, stock) {
      const product = {
        id: this.#products.length === 0 ? 1 : this.#products.length + 1,
        title,
        photo,
        price,
        stock,
      };
      this.#products.push(product);
      //console.log(this.#products);
    }
  
    read(){
      return console.log(this.#products)
    }
  
    readOne(id) {
      let productFound = this.#products.find((product) => product.id === id);
  
      if (productFound) {
        return console.log(productFound);
      } else {
        console.log(`Product with id ${id} not found.`);
        return null; // o algún otro valor que indique que el producto no se encontró
      }
    }
  }
  
  const testProducts = new ProductManager();
  testProducts.create("Computadora Portatil", "http://dummyimage.com/196x100.png/cc0000/ffffff", 8500, 5);
  testProducts.create("Mouse Inalambrico", "http://dummyimage.com/196x100.png/cc0000/ffffff", 325, 6);
  testProducts.read();
  testProducts.readOne(1);
  