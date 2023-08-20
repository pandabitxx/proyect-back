import { Router } from "express";
import productManager from "../controllers/ProductManager.js";

import userModel from "../dao/models/user.model.js";

const viewsRouter = Router();
const productos = new productManager();

viewsRouter.get("/dash", async (req, res) => {
    let nameRole = await userModel.find().lean();
    res.render("dashboard", {nameRole})
});

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