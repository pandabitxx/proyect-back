import { Router } from "express";

import productsController from "../dao/DataBaseManager/productsController.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/auth.jwt.js";

const {renderProductsForm, 
    createNewProduct, 
    renderProducts,
    renderEditProducts,
    updateProduct,
    deleteProduct,
    paginateProducts
} = productsController


const router2 = Router();

//New Product 
router2.get('/products/add', renderProductsForm);

// (Crear un nuevo Producto)
router2.post('/products/new-product', [verifyToken, isModerator], createNewProduct);

//Get all Products (Obtener productos de la base de datos)
router2.get('/products', renderProducts);

//Edit All Products 
router2.get('/products/edit/:id', verifyToken, renderEditProducts);

router2.put('/products/edit/:id', verifyToken, updateProduct);

//Delete Products
router2.delete('/products/delete/:id', verifyToken, deleteProduct);

//Paginate
router2.get('/pag', paginateProducts);

export default router2;
