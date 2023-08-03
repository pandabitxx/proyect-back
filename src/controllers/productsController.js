import ProductsSchema from "../models/Products.model.js";

const productsController = {};
const products = ProductsSchema;

productsController.renderProductsForm = (req, res) => {
    res.render('products/form-new-product')
}

productsController.createNewProduct = async (req, res) => {
    const { name, description, price, thumbnail, code, stock } = req.body
    if (!name || !description || !price || !thumbnail || !code || !stock){
        console.error("Todos los datos son obligatorios para agregar un producto.");
    } else {
        const newProduct = new products({name, description, price, thumbnail, code, stock})
        await newProduct.save();
        res.send('new product')
    }
}

productsController.renderProducts = async (req, res) => {
    const allProducts = await products.find().lean();
    res.render('products/all-products', { allProducts } );
}

productsController.renderEditProducts = (req, res) => {
    res.send('Render Edit Form')
}

productsController.updateProduct = (req, res) => {
    res.send('Update Product')
}

productsController.deleteProduct = (req, res) => {
    res.send('Delete Product')
}



export default productsController;