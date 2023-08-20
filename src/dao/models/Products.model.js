import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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

ProductsSchema.plugin(mongoosePaginate);
export default mongoose.model('products', ProductsSchema, 'Notas');