import { Router } from "express";
import  productsController  from "../dao/DataBaseManager/productsController.js"
import authMiddleware from "../utils/auth.middleware.js";


const viewsRouter = Router();


viewsRouter.get("/user", authMiddleware.isLoggIn, productsController.renderProducts);

viewsRouter.get("/f", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("dashboard", {
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