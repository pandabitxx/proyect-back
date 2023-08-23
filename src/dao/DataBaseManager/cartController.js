
import carsSchema from "../models/Cart.model.js"

const cartController = {};
const cart = carsSchema;

// Lógica del carrito

// Crear Carrito
cartController.createCart = async (req, res) => {
    const { products } = req.body;
    const newCart = new cart({ productos: products });
    await newCart.save();

    res.json({ status: "success", payload: newCart._id });
};

// Obtener Carritos

cartController.getCarts = async (req, res) => {
    try {
        let carts = await cart.find().lean().populate('productos'); // Nombre de referencia. 

        // Aquí recorremos los carritos y accedemos a las propiedades de los productos en cada carrito
        carts = carts.map(cart => {
            const productsInCart = cart.productos.map(producto => ({
                _id: producto._id,
                name: producto.name,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                // ... otras propiedades del producto
            }));

            return {
                _id: cart._id,
                productos: productsInCart,
                // ... otras propiedades del carrito
            };
        });

        res.render('views/cartUser', { carts });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


//Añadir un producto al carrito

// Función addProduct
cartController.addProduct = async (cartId, productId) => {
    try {
        let cartItem = await cart.findById(cartId).populate("productos");
        
        if (!cartItem) {
            throw new Error('Cart not found');
        }
        
        cartItem.productos.push(productId);
        await cartItem.save();

        
        return cartItem;
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
};

// Función addProductInCart
cartController.addProductInCart = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    try {
        let add = await cartController.addProduct(cartId, productId);
        res.json({ status: "success", payload: add });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

//Eliminar producto

cartController.removeProduct = async (cartId, productId) => {
    try {
        const car = await cart.updateOne(
            { _id: cartId },
            { $pull: { productos: productId } }
        );

        console.log("Producto eliminado del carrito con éxito");
        res.json({ status: "success", payload:car });

    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};


cartController.removeProductFromCart = async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    try {
        let remove = await cartController.removeProduct(cartId, productId);
        res.json({ status: "success", payload: remove });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export default cartController;