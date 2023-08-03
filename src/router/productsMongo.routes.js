import { Router } from "express";
import productsController from "../controllers/productsController.js";

const {renderProductsForm, 
    createNewProduct, 
    renderProducts,
    renderEditProducts,
    updateProduct,
    deleteProduct
} = productsController


const router2 = Router();

//New Product
router2.get('/products/add', renderProductsForm);

router2.post('/products/new-product', createNewProduct);

//Get all Products
router2.get('/products', renderProducts);

//Edit All Products
router2.get('/products/edit/:id', renderEditProducts);

router2.put('/products/edit/:id', updateProduct);

//Delete Products
router2.delete('/products/delete/:id', deleteProduct)



export default router2;