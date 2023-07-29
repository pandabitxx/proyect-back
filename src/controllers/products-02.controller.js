const productsController = {};

productsController.renderProductsForm = (req, res) => {
    res.render('products/new-product')
}

productsController.createNewProduct = (req, res) => {
    console.table(req.body)
    res.send('Nuevo producto')
}

productsController.renderProducts = (req, res) => {
    res.send('Render Products')
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