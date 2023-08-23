import { Router } from "express";
import productManager from "../../controllers/ProductManager.js";

const productsRouter = Router();
const productos = new productManager();
const readProducts = await productos.readProducts();

//console.log(readProducts);

//Agregar productos
productsRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    res.send(await productos.addProduct(title, description, price, thumbnail, code, stock));
})

// Limitar el numero de productos según el limit de la ruta EX: ?limit=2
productsRouter.get("/", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        if (!limit) {
            return res.send(await readProducts);
        } else {
            let allProducts = await readProducts;
            let productLimit = allProducts.slice(0, limit);
            res.send(productLimit);
        }
    } catch(error) {
        res.status(500).send("Error al obtener los productos");
    }
});

//Buscar ID por ruta 8080/p/id
productsRouter.get("/:id", async (req, res) => {
    try{
        let id = parseInt(req.params.id)
        let allProducts = await readProducts;
        let productById = allProducts.find(x => x.id === id);
        res.send(productById);
    } catch {
        res.status(500).send("Error al obtener el ID");
    }
});

productsRouter.delete("/:id", async (req, res) => {
    try{
        let deleteId = parseInt(req.params.id);
        res.send(await productos.deleteProduct(deleteId))
    } catch {
        res.status(500).send("Error al obtener el ID");
    }
});

productsRouter.put("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedData = req.body;
        await productos.updateProduct(productId, updatedData);
        res.send("Producto actualizado correctamente.");
    } catch (error) {
        res.status(500).send("Error al actualizar el producto.");
    }
});

export default productsRouter