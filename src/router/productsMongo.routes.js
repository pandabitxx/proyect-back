import { Router } from "express";

import productsController from "../dao/DataBaseManager/productsController.js";


const {
    createNewProduct, 
    renderProducts,
    renderEditForm,
    updateProduct,
    deleteProduct,
    paginateProducts
} = productsController


const productsDbRouter = Router();
// (Crear un nuevo Producto)
//El formulario hace un post a esta ruta
productsDbRouter.post('/products/new-product', createNewProduct); 

//Get all Products (Obtener productos de la base de datos)
productsDbRouter.get('/products', renderProducts);

//EditProducts 
productsDbRouter.get('/products/edit/:id', renderEditForm);
productsDbRouter.put('/products/edit/:id', updateProduct);

//Delete Products
productsDbRouter.delete('/products/delete/:id', deleteProduct);

//Paginate
productsDbRouter.get('/pag', paginateProducts);

export default productsDbRouter;
