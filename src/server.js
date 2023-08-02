//Creación del servidor
import express from "express";
import productsRouter from "./router/product.routes.js";
import cartRouter from "./router/cart.routes.js";
import viewsRouter from "./router/view.routes.js";
import {engine} from "express-Handlebars"
import __dirname from "./utils.js";
import path from "path"
import { Server } from "socket.io";
import { v4 as uuid } from 'uuid';
import('./database.js')
import morgan from "morgan";


//Armando el servidor con express
const app = express();
//Conexión con MongoDB


//Middleware 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Handlebars
app.engine(".hbs", engine({
    extname: '.hbs'
}));
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname + "/views"))



//Rutas
import router from "./router/index.routes.js";
import router2 from "./router/products-2.routes.js";
app.use(router);
app.use(router2);

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter)

//Rutas del Handlebar
app.use("/", viewsRouter);

//Archivos estáticos
app.use("/", express.static(__dirname + "/public"));

//Creación del puerto
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log( "Express por Local Host: " + PORT );
}) //genera el servidor en el puerto



//Creación del socket
let products = []


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
