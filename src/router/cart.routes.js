import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartRouter = Router()
const carts = new cartManager();
const readCarts = await carts.readCarts();

cartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts());
});

cartRouter.get('/', async (req, res) => {
    res.send(await carts.readCarts());
})

cartRouter.get("/:id", async (req, res) => {
    try{
        let id = parseInt(req.params.id)
        let allProducts = await readCarts;
        let productById = allProducts.find(x => x.id === id);
        res.send(productById);
    } catch {
        res.status(500).send("Error al obtener el ID");
    }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    //console.log(cartId);
    //console.log(productId);
    res.send(await carts.addProductInCart(cartId, productId));
})



export default cartRouter