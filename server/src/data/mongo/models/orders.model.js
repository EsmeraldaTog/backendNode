import { model, Schema,Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const collection = "orders";

const schema = new Schema(
  {
  pid:{ type: Types.ObjectId, required:true, ref: "products" },
  uid: { type: Types.ObjectId, required: true, ref: "users" },
 
  quantity: { type: Number, required: true,default:1 },
  state: { type: String, required: true , enum:["reserved","paid","delivered"],default:"reserved"},

},
{
    timestamps: true
});
schema.plugin(mongoosePaginate)

const Order = model(collection, schema);
export default Order;