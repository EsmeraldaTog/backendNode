import Product from "./models/product.model.js";
import Order from "./models/orders.model.js";
import User from "./models/user.model.js";
import  mongoose from "mongoose";
//import Types from "mongoose";


class MongoManager{

    constructor(model){
        this.model=model;

    }
    async create(data) {
        try {
          const one = await this.model.create(data);
          return one._id;
        } catch (error) {
          throw error;
        }
      }
     
    // async read(obj) {
    //     try {
    //       const {filter, order}= obj;
    //         const all = await this.model.find(filter).sort(order);
    //         if(all.length===0){
    //             const error= new Error ("There arent any items with that filter");
    //             error.statusCode=404;
    //             throw error;
    //         }
    //         return all;
    //       } 
          
    //       catch (error) {
    //         throw error;
    //       }
    //     }



    
    async read({filter,orderAndPaginate}){
      try {
        const all= await this.model

        .paginate(filter,orderAndPaginate)
        //console.log(all)
        //this.model.find(filter).sort(order) .populate("uid")
        if(all.totalPages === 0){
          const error= new Error("There aren't any document")
          error.statusCode=404
          throw error
         }
         return all
      } catch (error) {
        throw error
      }
    }


async report(uid) {
  try {
      const report = await this.model.aggregate([
       { $match: { uid: new mongoose.Types.ObjectId(uid) }},
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "pid",
          },
        },
    
//$replaceRoot para mergear el objeto con el objeto cero del array populado
{
  $replaceRoot: {
    newRoot: {
      $mergeObjects: [{ $arrayElemAt: ["$pid", 0] }, "$$ROOT"],
    },
  },
},
//$set para agregar la propiedad subtotal = price*quantity
{ $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
//$group para agrupar por user_id y sumar los subtotales
{ $group: { _id: "$uid", total: { $sum: "$subtotal" } } },
//$project para limpiar el objeto (dejar sólo user_id, total y date)
{
  $project: {
    _id: false,
    uid: "$_id",
    total: "$total",
    date: new Date(),
    currency: "USD",
  },
},
//{ $merge: { into: "bills" }}
]);
return report;
   
  } catch (error) {
      // Manejar el error de alguna manera, por ejemplo, lanzándolo nuevamente
      throw error;
  }
}



async readByEmail(email) {
  try {
    const docEmail = await this.model.findOne({ email });
    /*if (!docEmail || docEmail.length === 0) {
      const error = new Error(`User with email ${email} not found`);
      error.statusCode = 404;
      throw error;
    }*/
    return docEmail;
  } catch (error) {
    throw error;
  }
}




    async readOne(id) { 
try {
    const one= await this.model.findById(id)
    if(!one){
        const error= new Error("Product Not Found")
        error.statusCode=404;
        throw error;
    }
    return one;
} catch (error) {
    throw error;
    
}

    }
    async update(id, data) {

      try {
        const opt = { new: true };
        //este objeto de configuración OPCIONAL devuelve el objeto LUEGO de la modificacion
        const one = await this.model.findByIdAndUpdate(id, data, opt);
        if (!one) {
          const error = new Error("Product Not Found");
          error.statusCode = 404;
          throw error;
        }
        return one;
      } catch (error) {
        throw error;
      }
     }


    async destroy(id) {
      try {
        const one = await this.model.findByIdAndDelete(id);
        if (!one) {
          const error = new Error("Product Not Found");
          error.statusCode = 404;
          throw error;
        }
        return one;
      } catch (error) {
        throw error;
      }
    }
  
    async stats({filter}){
      try {
        let stats= await this.model.find(filter).explain("executionStats");
        stats={
          quantity: stats.executionStats.nReturned,
          time: stats.executionStats.executionTimeMillis,
        }
      return stats
      } catch (error) {
        throw error
        
      }
    }

     }
   

     const testProducts = new MongoManager(Product);
    const testOrders = new MongoManager(Order);
    const testUsers = new MongoManager(User);
     //const orders = 
     
     export { testProducts ,testOrders,testUsers}