const output = document.querySelector('#output');

const productUi = (newProduct) => {

    const div = document.createElement('div')

    div.innerHTML =`
    <div class="container card card-body"
        <div class="h3 card-title">
            <H3>${newProduct.nameProduct}<h3/>
            <h6>${newProduct.descripción}<h6/>
            <h6>${newProduct.price}<h6/>
            <h6>${newProduct.thumbnail}<h6/>
            <h6>${newProduct.code}<h6/>
            <h6>${newProduct.disabledSelect}<h6/>

            <button type="button" class="btn btn-secondary mt-3 update" data-id="${newProduct.code}">Actualizar</button>
            <button type="button" class="btn btn-danger delete mt-3" data-id="${newProduct.id}">Borrar</button>

        </div>
    </div>
    `;

    const btnDelete = div.querySelector('.delete');
    
    btnDelete.addEventListener('click', () => {
        deleteProduct(btnDelete.dataset.id)
    });

    return div

};

const renderProduct = products => {
    output.innerHTML ='';
    products.forEach((product) => {
        output.append(productUi(product));
    });
};

const appendProduct = product => {
    output.append(productUi(product))
};