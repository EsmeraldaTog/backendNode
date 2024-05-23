import argsUtil from "../utils/args.util.js";
import { randomBytes } from "crypto";


class ProductDTO{
 constructor (data){
    argsUtil.env !== "prod" && (this._id=randomBytes(12).toString("hex")),
    this.title= data.title,
    this.photo= data.photo,
    this.price= data.price,
    this.stock= data.stock,
    argsUtil.env !== "prod" && (this.createdAt = new Date())
    argsUtil.env !== "prod" && (this.updatedAt = new Date())
 }
    
}


export default ProductDTO