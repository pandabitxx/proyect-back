async function addProductInCart(productId) {
    try {
        const cartId = document.getElementById('cartId').value;

        const addProductResponse = await axios.post(`/api/${cartId}/${productId}`);

        const addProductData = addProductResponse.data;
        if (addProductData.status === 'success') {
            alert('Producto agregado al carrito');
        } else {
            alert('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}