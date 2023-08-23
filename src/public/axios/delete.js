function deleteProduct(productId) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        axios.delete(`/products/delete/${productId}`)
            .then(response => {
                // Manejar la respuesta si es necesario
                console.log(response.data);
                // Recargar la página o actualizar la lista de productos
                location.reload();
            })
            .catch(error => {
                console.error("Error al eliminar el producto:", error);
            });
    }
}