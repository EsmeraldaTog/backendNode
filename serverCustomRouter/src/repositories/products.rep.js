import ProductDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";

const { testProducts } =dao

class ProductsRep{
    constructor(){
        this.model= testProducts
    }

create =  async(data)=>{
    try {
        data= new ProductDTO(data)
        const response =await this.model.create(data)
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


destroy= async(pid)=>{
    try {
        const response= await this.model.destroy(pid)
        return response
        
    } catch (error) {
        throw error
    }
}


update= async(pid,data)=>{
    try {
        const response= await this.model.update(pid,data)
        return response;
 }
     catch (error) {
        throw error
    }
    
}
}

 const repository = new ProductsRep()

 export default repository 
