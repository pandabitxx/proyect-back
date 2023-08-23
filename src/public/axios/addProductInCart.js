async function addProductInCart(productId) {
    try {
        const createCartResponse = await axios.post('/api/carts/new-cart', {
            products: [productId]
        });

        const createCartData = createCartResponse.data;
        if (createCartData.status === 'success') {
            const cartId = createCartData.payload;

            const addProductResponse = await axios.post(`/api/${cartId}/${productId}`);

            const addProductData = addProductResponse.data;
            if (addProductData.status === 'success') {
                alert('Producto agregado al carrito');
            } else {
                alert('Error al agregar el producto al carrito');
            }
        } else {
            alert('Error al crear el carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}