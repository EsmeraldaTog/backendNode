import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    photo: { type: String, required: false },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;
