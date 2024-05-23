import argsUtil from "../utils/args.util.js"
import { randomBytes } from "crypto";


class OrderDTO{
    constructor (data){
        argsUtil.env !== "prod" && (this._id=randomBytes(12).toString("hex")),
        this.pid=data.pid,
        this.uid=data.uid,
        this.quantity=data.quantity,
        this.state=data.state,
        argsUtil.env !== "prod" && (this.createdAt = new Date())
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
      };

}

export default OrderDTO