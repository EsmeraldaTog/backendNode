import express from "express";
import testProducts from "./src/fs/ProductFile.js";

const app = express();
const PORT=8080;


//middlewares: son funciones
//app.use(express.urlencoded({ extended: true }));
//obliga al servidor a utilizar la funcion encargada de recibir URL complejas
//me habilita el manejo de queries (consultas) y params (parámetros)

app.listen(PORT, ()=> {

console.log("app listen on port "+ PORT)});

// END POINTS

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
