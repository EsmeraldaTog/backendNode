
const fs= require('fs');



class ProductManager {
    static #products = [];
  
    constructor(path) {
     this.path= path;
    }
  
    create(title, photo, price, stock) {

      const product = {
        id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products.length + 1,
        title,
        photo,
        price,
        stock,
      };

      ProductManager.#products.push(product);

      fs.promises.writeFile(this.path, JSON.stringify(ProductManager.#products, null, 2), 'utf-8')
          .then(() => console.log(`Registro exitoso del producto con ID: ${product.id}`))
          .catch(error => console.log(error.message));
  }
  
    read() {
        return new Promise((resolve, reject) => {
            fs.promises.readFile(this.path, 'utf-8') 
                .then(data => {
                    const dataProducts = JSON.parse(data)
                    console.log(dataProducts)
                    resolve(dataProducts)
                })
                .catch(error => reject(error));
        });
    }
    
    readOne(id) {
        return new Promise((resolve, reject) => {
            fs.promises.readFile(this.path, 'utf-8') 
                .then(data => {
                    const dataObject=JSON.parse(data);
                    const productFound=dataObject.find(product => product.id == id);

                    if(productFound){
                        console.log(productFound);
                        resolve(productFound)
                    }
                    else{
                        console.log(`Product with id ${id} not found`)
                        
                    }
                })
                .catch(error => reject(error));
            });
        }
                    
                    

}
  const testProducts = new ProductManager("./data/file.json");
testProducts.create("Computadora Portatil", "http://dummyimage.com/196x100.png/cc0000/ffffff", 8500, 5);
testProducts.create("Mouse Inalambrico", "http://dummyimage.com/196x100.png/cc0000/ffffff", 325, 6);

testProducts.read()
testProducts.readOne(1)

  