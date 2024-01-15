import { Router } from "express";
import testUser from "../../data/fs/UserFiles.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";


const usersRouter= Router();

// // END POINTS users

// Endpoint para creacion de users
usersRouter.post("/", propsUsers, async (req, response, next) => {
    try {
      const { name,photo,email} = req.body;
      const newUser = await testUser.create(name,photo,email);
  
      return response.json({
        statusCode: 201,
        response: newUser,
      });
    } catch (error) {
      return next(error);
    }
  });


usersRouter.get("/", async(req, response) =>{
    try {
    const users= await testUser.read()
    if(!users.length==0){
        response.json(
            {success:true,
            response: users
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        next(error)
        
    }
    
    
})


usersRouter.get("/:uid", async(req, response) =>{
    try {
    const  {uid} = req.params;
    const userId= await testUser.readOne(uid)
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

export default usersRouter;