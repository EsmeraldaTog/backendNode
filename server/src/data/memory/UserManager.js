class UserManager {
    #users = [];
  
    constructor() {}
  
    create(name, photo, email) {
      const user = {
        id: this.#users.length === 0 ? 1 : this.#users.length + 1,
       name,
        photo,
       email,
       
      };
      this.#users.push(user);
      //console.log(this.#products);
    }
  
    read(){
      return console.log(this.#users)
    }
  
    readOne(id) {
      let userFound = this.#users.find((user) => user.id === id);
  
      if (userFound) {
        return console.log(userFound);
      } else {
        console.log(`User with id ${id} not found.`);
        return null; // o algún otro valor que indique que el producto no se encontró
      }
    }
  }
  
  const testUser = new UserManager();
  testUser.create("Esmeralda Torres", "http://dummyimage.com/196x100.png/cc0000/ffffff", "esmeraldatorres.2305@gmail.com");
testUser.create("Elvi Martinez", "http://dummyimage.com/196x100.png/cc0000/ffffff","elvis.12@hotmail.com");
  testUser.read();
  testUser.readOne(1);