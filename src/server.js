//Creación del servidor
import express from "express";
import productsRouter from "./router/product.routes.js";
import cartRouter from "./router/cart.routes.js";
import {engine} from "express-Handlebars"
import __dirname from "./utils.js";
import path from "path"
import productManager from "./components/ProductManager.js";
import { Server } from "socket.io";
import { v4 as uuid } from 'uuid';


//Armando el servidor con express

const app = express();
const productos = new productManager();

//Se pone para que express no tenga problema para leer el endpoint si es extenso.
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Handelbars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"))


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter)


//Ruta del Handlebar
app.get("/d", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("home", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
});

app.get("/realTimeProducts", async (req, res) => {
    let allProducts = await productos.readProducts()
    res.render("realTimeProducts", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
});

//Archivos estáticos
app.use("/", express.static(__dirname + "/public"));

//Creación del puerto
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log( "Express por Local Host: " + PORT );
}) //genera el servidor en el puerto

let products = []

//Creación del socket
const io = new Server(httpServer)

io.on('connection', (socket) => {

    console.log("Nueva conexión: " + socket.id);

    socket.emit('server:loadProduct', products)

    socket.on('client:data', (newProduct) => {
        const product = { ...newProduct, id: uuid()};
        //console.log(product)
        products.push(product);
        io.emit('server:data', product)
    });

    socket.on('client:deleteProduct', id => {
        products = products.filter(product => product.id !== id);
        io.emit('server:loadProduct', products);
    })
});


//Encender el servidor
//server.on("error", (error) => console.log("Error del servidor" + error));

//npm run server
