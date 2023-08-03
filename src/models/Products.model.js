import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    thumbnail:{
        type: String,
        require: true
    },
    code:{
        type: Number,
        require: true
    },
    stock:{
        type: String,
        require: true
    },
}, {
    timestamps: true
})

export default mongoose.model('products', ProductsSchema, 'Notas');