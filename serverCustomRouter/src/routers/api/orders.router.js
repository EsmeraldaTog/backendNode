import { Router } from "express";

//import testOrders from "../../data/fs/OrdersFile.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";
import { testOrders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

// // END POINTS users

// Endpoint para creacion de users
ordersRouter.post("/", propsOrders, async (req, response, next) => {
  try {
    const { pid, uid, quantity, state } = req.body;
    const newOrder = await testOrders.create({ pid, uid, quantity, state });

    return response.json({
      statusCode: 201,
      response: newOrder,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, response, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { email: 1 },
    };

    const filter = req.query.filter ;
    const orders = await testOrders.read({ filter, orderAndPaginate });
    return response.json({
       success: true, 
       response: orders });
  } catch (error) {
    next(error);
  }
});

// ordersRouter.get("/:oid", async(req, response,next) =>{
//     try {
//     const  {oid} = req.params;

//     const orderId= await testOrders.readOne(oid)
//     if(orderId){
//         response.json(
//             {success:true,
//             response: orderId
//         }
//         )

//     }else{
//         return response.status(404).json({success:false,message:"not found"})
//     }
//     } catch (error) {
//         next(error)

//     }

// })

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await testOrders.report(uid);
    return res.json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", async (req, response, next) => {
  try {
    const { uid } = req.params;
    const filter = { uid: uid };

    const userId = await testOrders.read({ filter });
    if (userId) {
      response.json({ success: true, response: userId });
    } else {
      return response
        .status(404)
        .json({ success: false, message: "not found" });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:oid", async (req, response, next) => {
  try {
    const { oid } = req.params;

    const deleteProduct = await testOrders.destroy(oid);
    return response.json({
      statusCode: 200,
      response: deleteProduct,
    });
  } catch (error) {
    return next(error);
  }
});


ordersRouter.put("/:oid", async (req, response, next) => {

  try {
       const { oid } = req.params;
      const data = req.body;
  
      const updatedOrder = await testOrders.update(oid,data);
      return  response.json({
          statusCode: 200,
          response: updatedOrder,
        });
       

  } catch (error) {
   return next(error)
      
  }
})

export default ordersRouter;
