import { Router } from "express";
import testProducts from "../../data/fs/ProductFile.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

// Endpoint para creacion de productos
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

// obtener todos los productos
productsRouter.get("/", async (req, response, next) => {
  try {
    const products = await testProducts.read();
    if (!products.length == 0) {
      response.json({ success: true, response: products });
    } else {
      return response
        .status(404)
        .json({ success: false, message: "not found" });
    }
  } catch (error) {
    return next(error);
  }
});

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
