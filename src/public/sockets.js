const socket = io()

const saveProduct = (nameProduct, descripción, price, thumbnail, code, disabledSelect) => {
    socket.emit('client:data', {
        nameProduct,
        descripción,
        price,
        thumbnail,
        code,
        disabledSelect,
    });
};

const deleteProduct = id => {
    socket.emit('client:deleteProduct', id);
}

socket.on("server:data", appendProduct);
socket.on("server:loadProduct", renderProduct);