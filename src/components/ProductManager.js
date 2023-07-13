import fs from 'fs';

export default class productManager {
    constructor() {
        this.path = "./src/models/products.json";
        this.products = [];
        this.lastId = 0;
        this.loadProducts();
    }

    async loadProducts() {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        if (this.products.length > 0) {
            this.lastId = this.products[this.products.length - 1].id;
            //console.log('Productos cargados correctamente.');
        }
        } catch (error) {
        console.error('Error al cargar los productos:', error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los datos son obligatorios para agregar un producto.");
        } else {
        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.error("Ya existe un producto con el mismo código.");
        } else {
            const producto = { id: this.lastId + 1, title, description, price, thumbnail, code, stock };
            this.products.push(producto);
            this.lastId++;
            try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados correctamente.');
            } catch (error) {
            console.error('Error al guardar los productos:', error);
            }
        }
        }
    }

    async readProducts() {
        try {
        const data1 = await fs.promises.readFile(this.path, 'utf-8');
        //console.log('Productos Leidos correctamente')
        return JSON.parse(data1);
        } catch (error) {
        console.error('Error al leer los productos:', error);
        }
    }

    async getProducts() {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        console.log('Productos obtenidos correctamente.');
        return console.log(this.products);
        } catch (error) {
        console.error('Error al obtener los productos:', error);
        }
    }

    getProductById(id) {
        const findId = this.products.find(x => x.id === id);
        if (!findId) {
        console.warn('El ID no existe');
        } else {
        //console.log(findId);
        return findId;
        }
    };

    async updateProduct(id, updatedData) {
        const findId = this.products.findIndex(x => x.id === id);
        if (findId === -1) {
            console.warn('El ID no existe');
        } else {
            const existingProduct = this.products[findId];
            const { code: updatedCode, ...rest } = updatedData; // Se extrae el código del objeto actualizado
    
            if (updatedCode && updatedCode !== existingProduct.code) {
                const codeExists = this.products.some(product => product.code === updatedCode);
                if (codeExists) {
                    console.error("Ya existe un producto con el mismo código.");
                    return;
                }
            }
    
            const updatedProduct = { ...existingProduct, ...rest }; // Se crea un nuevo objeto con los datos actualizados, sin incluir el código si se ha proporcionado
    
            this.products[findId] = updatedProduct;
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log('Producto actualizado correctamente.');
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        }
    };
    
    

    async deleteProduct(id) {
        const findId = this.products.findIndex(x => x.id === id);
        console.warn(findId);
        if (findId === -1) {
        console.warn('El ID no existe');
        } else {
        this.products.splice(findId, 1);
        for (let i = findId; i < this.products.length; i++) {
            this.products[i].id = this.products[i].id - 1;
        };
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null , 2));
            console.log('Producto eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
        }
    };


}
