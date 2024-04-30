
import { create, destroy, read, readOne, report, update  } from "../../controllers/orders.controller.js";
import CustomRouter from "../CustomRouter.js";


export default class OrdersRouter extends CustomRouter{

  init(){
    
// Endpoint para creacion de ordenes de compra
this.create("/",["USER","PREM","ADMIN"],  create);



this.read("/",["ADMIN"] , read );

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

this.read("/total/:uid", ["USER","ADMIN","PREM"],report);

this.read("/:uid",["USER","ADMIN"],readOne);

this.destroy("/:oid",["USER"], destroy);


this.update("/:oid",["USER"] ,update)

}
}









