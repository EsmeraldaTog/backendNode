import { Router } from "express";
//import testUser from "../../data/fs/UserFiles.js";

import propsUsers from "../../middlewares/propsUsers.mid.js";
import { testUsers } from "../../data/mongo/manager.mongo.js";


const usersRouter= Router();

// // END POINTS users

// Endpoint para creacion de users
usersRouter.post("/", propsUsers ,async (req, response, next) => {
    try {
      const { name,photo,email} = req.body;
      const newUser = await testUsers.create({name,photo,email});
  
      return response.json({
        statusCode: 201,
        response: newUser,
      });
    } catch (error) {
      return next(error);
    }
  });


usersRouter.get("/", async(req, response,next) =>{
    try {
const orderAndPaginate={
    limit:req.query.limit || 10,
    page:req.query.page || 1,
    sort:{email:1}
}

const filter={}

if (req.query.email) {
    filter.email = new RegExp(req.query.email.trim(), "i");
  }
    const users= await testUsers.read({filter,orderAndPaginate})
    return response.json( 
        { success:true,
            response: users
 })
    
    } catch (error) {
        next(error)
        
    }
    
    
})


usersRouter.get("/:uid", async(req, response,next) =>{
    try {
    const  { uid } = req.params;
    const userId= await testUsers.readOne(uid)
    if(userId){
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

usersRouter.put("/:uid", async (req, response, next) => {

    try {
         const { uid } = req.params;
        const data = req.body;
    
        const updatedUser = await testUsers.update(uid,data);
        return  response.json({
            statusCode: 200,
            response: updatedUser,
          });
         

    } catch (error) {
     return next(error)
        
    }
})

usersRouter.get("/:email", async (req, response, next) => {

    try {
         const { uemail } = req.query;
        
    
        const user = await testUsers.readByEmail(uemail);
        return  response.json({
            statusCode: 200,
            response: user,
          });
         

    } catch (error) {
     return next(error)
        
    }
})


export default usersRouter;