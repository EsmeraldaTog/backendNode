import { Router } from "express";
import testProducts from "../../data/fs/ProductFile.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";



const productsRouter= Router();


productsRouter.post("/", propsProducts, async (req, response, next) => {
    try {
      const { title, photo, price, stock } = req.body;
      const newProduct = await testProducts.create(title, photo, price, stock);
  
      return response.json({
        statusCode: 201,
        response: newProduct,
      });
    } catch (error) {
      return next(error);
    }
  });
  

productsRouter.put("/",async (req,response)=>{})

productsRouter.delete("/",async (req,response)=>{})

productsRouter.get("/", async(req, response,next) =>{
    try {
    const products= await testProducts.read()
    if(!products.length==0){
        response.json(
            {success:true,
            response: products
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        return next(error);
        
    }
    
    //res.send("Hola desde products");
})

productsRouter.get("/:pid", async(req, response,next) =>{
    try {
    const  {pid} = req.params;
    const productId= await testProducts.readOne(pid)
    if(productId){
        response.json(
            {success:true,
            response: productId
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        return next(error)
        
    }
    
    //res.send("Hola desde products");
})


export default productsRouter;