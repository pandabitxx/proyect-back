import { Router } from "express";
import productManager from "../controllers/ProductManager.js";

const viewsRouter = Router();
const productos = new productManager();

viewsRouter.get("/f", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("main", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
});

viewsRouter.get("/d", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("home", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("realTimeProducts", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
});

export default viewsRouter;