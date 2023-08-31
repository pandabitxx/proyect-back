import mongoose, { Schema, model } from "mongoose";

const cartSchema = new mongoose.Schema({
    productos: [{
        default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: "products" //referencia al modelo de productos
    }]
});
 
export default mongoose.model('carts', cartSchema);
