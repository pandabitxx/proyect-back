//Captura de datos del Front
const form = document.querySelector('#formulario');
const nameProduct = document.querySelector('#nameProduct');
const descripcion = document.querySelector('#descripción');
const price = document.querySelector('#price');
const thumbnail = document.querySelector('#thumbnail');
const code = document.querySelector('#code');
const disabledSelect = document.querySelector('#disabledSelect');

form.addEventListener("submit", e => {
    e.preventDefault()
    saveProduct(
        nameProduct.value,
        descripción.value,
        price.value,
        thumbnail.value,
        code.value,
        disabledSelect.value,
    );
});

