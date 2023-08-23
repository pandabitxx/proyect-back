function editProduct(productId) {
    if (confirm("¿Estás seguro de que deseas editar este producto?")) {
        axios.put(`/products/edit/${productId}`)
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
