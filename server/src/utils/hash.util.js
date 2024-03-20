import { compareSync, genSaltSync, hashSync } from "bcrypt";

///funciones de utilidad para manejar las contraseñas

// funcion para hashear la contraseña  registrada por el usuario

const createHash = (password)=> hashSync(password,genSaltSync(10));


//funcion para comparar si la contrasena ingresada es correcta o no
const validatePass= (req,db)=> compareSync(req,  db);


export {createHash, validatePass} ;