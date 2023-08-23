//Creación del servidor
import express from "express";
import createRoles from "./libs/initialSetup.js";
import('./database.js')
import productsRouter from "./router/filesystem.router/product.routes.js";
import cartRouter from "./router/filesystem.router/cart.routes.js";
import viewsRouter from "./router/view.routes.js";
import {engine} from "express-Handlebars"
import __dirname from "./utils.js";
import path from "path"
import { Server } from "socket.io";
import { v4 as uuid } from 'uuid';
import morgan from "morgan";
import MethodOverride from "method-override";


import loginRouter from "./router/login.routes.js";
import productsDbRouter from "./router/productsMongo.routes.js";
import routerCarts from "./router/cartsMongo.routes.js";
import passport from "passport";



//Armando el servidor con express
const app = express();
createRoles();


//Middleware 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(MethodOverride('_method'))
app.use(express.json());
app.use(passport.initialize());
//app.use(passport.session());


//Handlebars
app.engine(".hbs", engine({
    extname: '.hbs'
}));
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname + "/views"))

//Rutas Autenticación


//Rutas Usando Mongo
app.use(loginRouter);
//Products Mongo
app.use(productsDbRouter);
//Carts Mongo
app.use(routerCarts);

//Rutas Persistencia
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
