import { testProducts } from "../data/mongo/manager.mongo.js";

class ProductsService{

    constructor(){
        this.model= testProducts;
    }

  create =  async({title,photo,price,stock})=>{
    try {
        
        const response =await this.model.create({title,photo,price,stock})
        return response;
    } catch (error) {
        throw error
    }
  }

  read= async ({filter, orderAndPaginate})=>{
    try {
        const products = await this.model.read({ filter, orderAndPaginate });
        return products
    } catch (error) {
        throw error
    }
    
  }


  readOne= async (pid)=>{
    try {
        
        const productId= this.model.readOne(pid);
        return productId
    } catch (error) {
        throw error
    }
}

 update= async()=>{
    try {
        const response= await this.model.update(pid,data)
        return response;
 }
     catch (error) {
        throw error
    }
    
}

destroy= async(pid)=>{
    try {
        const response= await this.model.destroy(pid)
        return response
        
    } catch (error) {
        throw error
    }
}


}
const serviceProducts = new ProductsService();
export default serviceProducts
