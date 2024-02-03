import {model, Schema} from "mongoose";

const collection= "products"

const schema = new Schema({
    name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
photo: { type: String, default: '/profile.png' },
role: { type: Number, default: 0 },
});
