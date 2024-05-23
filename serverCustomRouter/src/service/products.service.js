import repository from "../repositories/products.rep.js";




class ProductsService{

    constructor(){
        this.repository= repository;
    }

  create =  async(data)=>{
    try {
        
        const response =await this.repository.create(data)
        return response;
    } catch (error) {
        throw error
    }
  }

  read= async ({filter, orderAndPaginate})=>{
    try {
        const products = await this.repository.read({ filter, orderAndPaginate });
        return products
    } catch (error) {
        throw error
    }
    
  }


  readOne= async (pid)=>{
    try {
        
        const productId= this.repository.readOne(pid);
        return productId
    } catch (error) {
        throw error
    }
}

 update= async(pid,data)=>{
    try {
        const response= await this.repository.update(pid,data)
        return response;
 }
     catch (error) {
        throw error
    }
    
}

destroy= async(pid)=>{
    try {
        const response= await this.repository.destroy(pid)
        return response
        
    } catch (error) {
        throw error
    }
}


}
const serviceProducts = new ProductsService();
export default serviceProducts
