import { Router } from "express";
import cartController from "../dao/DataBaseManager/cartController.js";

const {
    createCart,
    getCarts,
    addProductInCart,
    removeProductFromCart
} = cartController

const routerCarts = Router();

//Crear Carrito. 
routerCarts.post('/api/carts/new-cart', createCart);

//Get Carts
routerCarts.get('/api/carts', getCarts);

//Agregar un producto al carrito.
routerCarts.post("/api/:cid/:pid", addProductInCart)

//Eliminar un producto del carrito. 
routerCarts.delete('/api/:cid/:pid', removeProductFromCart);


export default routerCarts;