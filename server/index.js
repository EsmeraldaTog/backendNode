import express from "express";
import testProducts from "./src/fs/ProductFile.js";
import testUser from "./src/fs/UserFiles.js";

const app = express();
const PORT=8080;


//middlewares: son funciones
//app.use(express.urlencoded({ extended: true }));
//obliga al servidor a utilizar la funcion encargada de recibir URL complejas
//me habilita el manejo de queries (consultas) y params (parámetros)

app.listen(PORT, ()=> {

console.log("app listen on port "+ PORT)});




// END POINTS products

app.get("/api/products", async(req, response) =>{
    try {
    const products= await testProducts.read()
    if(!products.length==0){
        response.json(
            {success:true,
            response: products
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        console.log(error.message)
        
    }
    
    //res.send("Hola desde products");
})


app.get("/api/products/:pid", async(req, response) =>{
    try {
    const  {pid} = req.params;
    const productId= await testProducts.readOne(pid)
    if(productId){
        response.json(
            {success:true,
            response: productId
        }
        )
        
    }else{
        return response.status(404).json({success:false,message:"not found"})
    }
    } catch (error) {
        console.log(error.message)
        
    }
    
    //res.send("Hola desde products");
})

// END POINTS users

app.get("/api/users", async(req, response) =>{
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


app.get("/api/users/:uid", async(req, response) =>{
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