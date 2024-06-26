import { Router } from "express";
//import testProducts from "../../data/fs/ProductFile.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import { testProducts } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import  passport from "../../middlewares/passport.mid.js"
//import isAuth from "../../middlewares/isAuth.js";

const productsRouter = Router();

// Endpoint para creacion de productos
productsRouter.post("/",passport.authenticate("jwt",{session:false}), isAdmin, async (req, response, next) => {
  try {
    const { title, photo, price, stock } = req.body;
    const newProduct = await testProducts.create({title, photo, price, stock});

    return response.json({
      statusCode: 201,
      response: newProduct,
    });
  } catch (error) {
    return next(error);
  }
});

// obtener todos los productos
productsRouter.get("/", async (req, response, next) => {
  try {
    const orderAndPaginate={
        limit:req.query.limit || 20,
        page:req.query.page || 1,
        sort:{title:1}
    }
    
    const filter={}
    
    if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
        const products= await testProducts.read({filter,orderAndPaginate})
        return response.json( 
            { success:true,
                response: products
     })
        
        } catch (error) {
            next(error)
            
        }
        
        
    })

//obtener un producto

productsRouter.get("/:pid", async (req, response, next) => {
  try {
    const { pid } = req.params;
    const productId = await testProducts.readOne(pid);
    if (productId) {
      response.json({ success: true, response: productId });
    } else {
      return response
        .status(404)
        .json({ success: false, message: "not found" });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, response, next) => {

    try {
         const { pid } = req.params;
        const data = req.body;
    
        const updatedProduct = await testProducts.update(pid,data);
        return  response.json({
            statusCode: 200,
            response: updatedProduct,
          });
         

    } catch (error) {
     return next(error)
        
    }
})


productsRouter.delete("/:pid", async (req, response,next) => {

    try {
         const { pid } = req.params;
       
        const deleteProduct = await testProducts.destroy(pid);
        return  response.json({
            statusCode: 200,
            response: deleteProduct,
          });
         
    } catch (error) {
        return next(error)
    }
});

export default productsRouter;
