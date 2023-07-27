import { Schema, model } from "mongoose";

const CartsSchema = new Schema({
    id:{
        type: String,
        require: true
    },
    products:{
        type: String,
        require: true
    },
}, {
    timestamps: true 
})

module.exports = model('carts', CartsSchema);
