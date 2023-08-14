import { Router } from "express";
import cartController from "../dao/DataBaseManager/cartController.js";

const {
    deleteProductCart,
    updateCartProducts,
    updateCartProductsQuantity,
    deleteProductsCart,
    createCart,
    getCarts,
    addProductInCart,
    removeProductFromCart
} = cartController

const routerCarts = Router();

//Crear Carrito 
routerCarts.post('/api/carts/new-cart', createCart);
//routerCarts.get('/api/carts/new-cart', (req, res) => res.json('Hola'));

//Get Carts
routerCarts.get('/api/carts', getCarts);

//Agregar un producto al carrito
routerCarts.post("/api/:cid/:pid", addProductInCart)

routerCarts.delete('/api/:cid/:pid', removeProductFromCart);


export default routerCarts;