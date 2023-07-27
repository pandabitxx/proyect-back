import fs, { lchown } from 'fs';
import productManager from './ProductManager.js';

const productAll = new productManager();

export default class cartManager {
    constructor() {
        this.path = "./src/models/carts.json";
        this.cart = [];
        this.ultimateID = 0;
        this.loadCarts();
    };
    
    async loadCarts() {
        try {
        const dataCarts = await fs.promises.readFile(this.path, 'utf-8');
        this.cart = JSON.parse(dataCarts);
        if (this.cart.length > 0) {
            this.ultimateID = this.cart[this.cart.length - 1].id;
            //console.log('Productos cargados correctamente.');
        }
        } catch (error) {
        console.error('Error al cargar los productos:', error);
        }
    };

    async readCarts() {
        try {
        const carts = await fs.promises.readFile(this.path, 'utf-8');
        //console.log('Productos Leidos correctamente')
        return JSON.parse(carts);
        } catch (error) {
        console.error('Error al leer los productos:', error);
        }
    };

    writeCarts = async (cart) => {
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2));
    };

    addCarts = async () => {
        let cartsConcat = { id: this.ultimateID + 1, products: [] };
        this.cart.push(cartsConcat);
        this.ultimateID++;
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
            console.log('Carrito guardado correctamente.');
            } catch (error) {
            console.error('Error al guardar el carrito:', error);
            }
      };


    getCartById(id) {
        const findId = this.cart.find(x => x.id === id);
        if (!findId) {
        console.warn('El ID no existe');
        } else {
        //console.log(findId);
        return findId
        }
    }

    async addProductInCart(cartId, productId) {
        let cartById = await this.getCartById(cartId);
        if (!cartById) return "Carrito No Encontrado";

        let productById = productAll.getProductById(productId);
        if (!productById) return "Producto No Encontrado";

        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter(x => x.id != productId);

        if(cartById.products.some(prod => prod.id === productId)){
            let ProductInCart = cartById.products.find(prod => prod.id === productId);
            ProductInCart.cantidad++;
            let cartsContact = [ProductInCart, ...cartFilter];
            await this.writeCarts(cartsContact);
            return "Producto sumado al carrito";
        };
        let cartsConcat =[{id: cartId, products: [{id:productById.id, cantidad: 1}]}, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "Producto Agregado al carrito";
      };
}


