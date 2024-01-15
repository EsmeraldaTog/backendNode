import { Router } from "express";

import testOrders from "../../data/fs/OrdersFile.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();



// // END POINTS users

// Endpoint para creacion de users
ordersRouter.post("/", propsOrders, async (req, response, next) => {
    try {
      const { pid,uid,quantity, state} = req.body;
      const newOrder = await testOrders.create(pid,uid,quantity, state);
  

      return response.json({
        statusCode: 201,
        response: newOrder,
      });
    } catch (error) {
      return next(error);
    }
  });


ordersRouter.get("/", async(req, response,next) =>{
    try {
    const orders= await testOrders.read()
    if(!orders.length==0){
        response.json(
            {success:true,
            response: orders
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        next(error)
        
    }
    
    
})


ordersRouter.get("/:oid", async(req, response,next) =>{
    try {
    const  {oid} = req.params;
    const orderId= await testOrders.readOne(oid)
    if(orderId){
        response.json(
            {success:true,
            response: userId
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        next(error)
        
    }
    
   
})

ordersRouter.delete("/:oid", async (req, response,next) => {

    try {
         const { oid } = req.params;
       
        const deleteProduct = await testOrders.destroy(oid);
        return  response.json({
            statusCode: 200,
            response: deleteProduct,
          });
         
    } catch (error) {
        return next(error)
    }
});

  export default ordersRouter