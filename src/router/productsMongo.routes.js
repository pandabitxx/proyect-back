import { Router } from "express";

import productsController from "../dao/DataBaseManager/productsController.js";
import { isAuthenticated } from "../middlewares/auth.passport.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authRoles.js";


const {renderProductsForm, 
    createNewProduct, 
    renderProducts,
    renderEditProducts,
    updateProduct,
    deleteProduct,
    paginateProducts
} = productsController


const productsDbRouter = Router();

//New Product 
productsDbRouter.get('/products/add', renderProductsForm);

// (Crear un nuevo Producto)
productsDbRouter.post('/products/new-product', [verifyToken, isModerator], createNewProduct);

//Get all Products (Obtener productos de la base de datos)
productsDbRouter.get('/products', renderProducts);

//Edit All Products 
productsDbRouter.get('/products/edit/:id', verifyToken, renderEditProducts);

productsDbRouter.put('/products/edit/:id', verifyToken, updateProduct);

//Delete Products
productsDbRouter.delete('/products/delete/:id', verifyToken, deleteProduct);

//Paginate
productsDbRouter.get('/pag', paginateProducts);

export default productsDbRouter;
