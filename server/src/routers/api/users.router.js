import { Router } from "express";
import testUser from "../../data/fs/UserFiles.js";


const usersRouter= Router();

// // END POINTS users

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
        console.log(error.message)
        
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
        console.log(error.message)
        
    }
    
   
})

export default usersRouter;