import ProductsSchema from "../models/Products.model.js";

const productsController = {};
const products = ProductsSchema;


productsController.createNewProduct = async (req, res) => {
    const { name, description, price, thumbnail, code, stock } = req.body
    if (!name || !description || !price || !thumbnail || !code || !stock){
        console.error("Todos los datos son obligatorios para agregar un producto.");
    } else {
        const codeExists = await products.findOne({ code: code });
        if (codeExists) {
            console.error("Ya existe un producto con el mismo código.");
        } else {
            const newProduct = new products({name, description, price, thumbnail, code, stock})
            await newProduct.save();
            res.redirect('/products')
        }
    }
}

//esto va en views
productsController.renderProducts = async (req, res) => {
    const allProducts = await products.find().lean();
    //res.render('views/moderator', { allProducts } );
    res.render('views/admin', { allProducts } );
}

//paginate

productsController.getProductsWithPagination = async (selectedCategory, sortOrder, itemsPerPage, currentPage) => {
    const limit = parseInt(itemsPerPage, 10) || 10;
    const page = parseInt(currentPage, 10) || 1;
    const sortingOrder = parseInt(sortOrder);

    const filterOptions = {};
    if (selectedCategory) {
        filterOptions.category = selectedCategory;
    }

    try {
        const paginatedResults = await products.paginate(filterOptions, { limit, page, sort: { price: sortingOrder } });

        const formattedData = {
            items: paginatedResults.docs,
            totalItems: paginatedResults.totalDocs,
            itemsPerPage: paginatedResults.limit,
            currentPage: paginatedResults.page,
            totalPages: paginatedResults.totalPages,
            currentPageItemCount: paginatedResults.pagingCounter,
            hasPreviousPage: paginatedResults.hasPrevPage,
            hasNextPage: paginatedResults.hasNextPage,
            previousPage: paginatedResults.prevPage,
            nextPage: paginatedResults.nextPage
        };
        return formattedData;
    } catch (error) {
        throw error;
    }
};

productsController.paginateProducts = async (req, res) => {
    const requestedCategory = req.query.category;
    const requestedSortingOrder = req.query.sortOrder;
    const requestedItemsPerPage = req.query.itemsPerPage;
    const requestedPage = req.query.page;

    try {
        const paginatedResult = await productsController.getProductsWithPagination(requestedCategory, requestedSortingOrder, requestedItemsPerPage, requestedPage);
        
        res.json({
            status: "success",
            payload: paginatedResult.items,
            info: {
                itemsPerPage: paginatedResult.itemsPerPage,
                currentPage: paginatedResult.currentPage,
                totalPages: paginatedResult.totalPages,
                currentPageItemCount: paginatedResult.currentPageItemCount,
                hasPreviousPage: paginatedResult.hasPreviousPage,
                hasNextPage: paginatedResult.hasNextPage,
                previousPage: paginatedResult.previousPage,
                nextPage: paginatedResult.nextPage
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while paginating products."
        });
    }
};


///
productsController.renderEditForm = async (req, res) => {
    const editProduct = await products.findById(req.params.id);
    const id = editProduct._id;
    const name = editProduct.name;
    const description = editProduct.description;
    const price = editProduct.price;
    const thumbnail = editProduct.thumbnail;
    const code = editProduct.code;
    console.log(id)
    res.render('views/editProducts', {editProduct, id, name, description, price, thumbnail, code})
}

productsController.updateProduct = async (req, res) => {
        const { name, description, price, thumbnail, code, stock } = req.body;
        await products.findByIdAndUpdate(req.params.id, { name, description, price, thumbnail, code, stock });
        res.redirect("/products");
}

productsController.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await products.deleteOne({ _id: productId });

        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto." });
    }
}



export default productsController;