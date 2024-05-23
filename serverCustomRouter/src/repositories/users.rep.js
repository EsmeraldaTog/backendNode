import dao from "../data/index.factory.js";
import UserDTO from "../dto/users.dto.js";


const { testUsers } = dao;

class UsersRep {
  constructor() {
    this.model = testUsers;
  }
  
  
  create = async (data) => {
    try {
        data= new UserDTO(data)
    const response = await this.model.create(data)
    return response
    } catch (error) {
        throw error
    }
    
}

  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  //   stats = async (id) => await this.model.stats(id);
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new UsersRep();

export default repository;
