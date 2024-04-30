import { testUsers } from "../data/mongo/manager.mongo.js";


class UsersService{
 constructor (){
    this.model = testUsers
 }


 create = async (data) => await this.model.create(data);
  read = async ({ filter, options }) => await this.model.read({ filter, options });
//   stats = async (id) => await this.model.stats(id);
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);

}

const service= new UsersService();

export default service