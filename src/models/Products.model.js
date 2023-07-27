import { Schema, model } from "mongoose";

const ProductsSchema = new Schema({
    id:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    thumbnail:{
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    stock:{
        type: String,
        require: true
    },
}, {
    timestamps: true
})

module.exports = model('products', ProductsSchema);