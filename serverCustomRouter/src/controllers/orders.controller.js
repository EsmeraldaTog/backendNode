import serviceOrders from "../service/orders.service.js";

class OrdersController {
    constructor (){
        this.service= serviceOrders;
    }
     create= async (req, response, next) => {
        try {
          const { _id }= req.user
          req.body.uid= _id
          const { pid,  quantity, uid } = req.body;
          const newOrder = await this.service.create({ pid, uid, quantity });
        return response.success201(newOrder)
         
        } catch (error) {
          return next(error);
        }
      }

read= async (req, response, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { email: 1 },
      };
  
      const filter = req.query.filter ;
      const orders = await this.service.read({ filter, orderAndPaginate });
      return response.success200(orders)
    } catch (error) {
      next(error);
    }
  }


   readOne= async (req, response, next) => {
    try {
      const { uid } = req.params;
      const filter = { uid: uid };
  
      const userId = await this.service.read({ filter });
      if (userId) {
        response.success200();
      } else {
        return response.error404()
      }
    } catch (error) {
      next(error);
    }
  }
report= async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.report(uid);
      return res.success200(report);
    } catch (error) {
      return next(error);
    }
  }

  update =async (req, response, next) => {

    try {
         const { oid } = req.params;
        const data = req.body;
    
        const updatedOrder = await this.service.update(oid,data);
        return  response.success201(updatedOrder);
         
  
    } catch (error) {
     return next(error)
        
    }
  }
   


destroy =async (req, response, next) => {
    try {
      const { oid } = req.params;
  
      const deleteProduct = await this.service.destroy(oid);
      return response.success200(deleteProduct);
    } catch (error) {
      return next(error);
    }
  }

}
 const ordersController= new OrdersController();
    export  const {create, read, report,readOne,update, destroy } = ordersController