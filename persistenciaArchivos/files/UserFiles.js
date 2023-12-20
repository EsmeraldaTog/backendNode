const fs=require('fs');


class UserManager {
     static #users = [];
  
    constructor(path) {
        this.path=path;
    }
  
   async create(name, photo, email) {
    try {

        const user = {
            id: UserManager.#users.length === 0 ? 1 : UserManager.#users.length + 1,
           name,
            photo,
           email,
           
          };


          UserManager.#users.push(user);
        await fs.promises.writeFile(this.path, JSON.stringify(UserManager.#users, null, 2), 'utf-8')
                console.log(` Usuario with ID: ${user.id}`)

        
        
    } catch (error) {
        console.log(error)
        
    }
     
    }

    async read() {


        try {
           const readProducts= await fs.promises.readFile(this.path, 'utf-8')
           const ProductsObject= JSON.parse(readProducts)
           
           console.log(ProductsObject)
           
   } catch (error) {
            console.log(error)
        }
        
    }

   async readOne(id) {

        try {
            const readProducts= await fs.promises.readFile(this.path, 'utf-8') 
            const productsObject=JSON.parse(readProducts);
            const productFound=productsObject.find(product => product.id == id);
            console.log(productFound)
        } catch (error) {
            console.log(error)
        }
    }
  
  }
const testUser = new UserManager("./data/fileUsers.json");
testUser.create("Esmeralda Torres", "http://dummyimage.com/196x100.png/cc0000/ffffff", "esmeraldatorres.2305@gmail.com");
testUser.create("Elvi Martinez", "http://dummyimage.com/196x100.png/cc0000/ffffff","elvis.12@hotmail.com");
testUser.read();
testUser.readOne(1);
  