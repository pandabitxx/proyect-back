var boton = document.getElementById("carritoBtn");

// Agrega un evento click al botón
boton.addEventListener("click", function() {
    // Navega al enlace deseado cuando se hace clic en el botón
    window.location.href = "/api/carts";
});