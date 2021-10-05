import {formattedPrice} from './utils.js'

/**
 * Permet de créer les options de la balise select du produit à afficher
 * @param {*} options 
 */
 function createOptions(options) {
    
    //Sélection du select où l'on crée les options
    let selectElt = document.querySelector('#colors');
    //Parcourt du tableau options[]
    for (let i = 0; i <= options.length + 2; i++)
    {
        //Récupère la couleur correspondant à l'indice i
        let color = options.shift();
        //Création de l'élément option 
        let opt = new Option(color, color.toLowerCase().replace(' ', '-'));
        //Ajout de l'elément dans la balise select en tant qu'enfant
        selectElt.appendChild(opt);
    }
}

/**
 * Permet d'afficher le  produit Teddie dans la page produit.html
 * @param {Object} teddie
 */
 async function renderOneTeddie(teddie) {

    //Récupération du tableau de couleur du produit
    let colors = teddie.colors;
    
    //Modification du lien actif dans le menu
    let navActive = document.querySelector('.active');
    navActive.innerHTML = `${teddie.name}`;

    //Récupération de la section qui recevra l'affichage du produit
    let section = document.querySelector('#products');

    //Ajout du produit dans la section de la page produit.html
    section.innerHTML = `
        <article class="main__item--product row">
            <div class="product__item col-md-6 p-3 d-flex justify-content-center align-items-center">
                <img class="product__item--img rounded"
                     src="${teddie.imageUrl}"
                     alt="peluche"
                     width="275"
                     height="202"
                >
            </div>
            <div class="col-md-6 p-3">
                <p class="fw-bold fs-4">${teddie.name}</p>
                <p>${formattedPrice(teddie.price)} €</p>
                <p class="fs-6">
                    ${teddie.description}
                </p>
                <div class="w-75">
                    <select id="colors" class="form-select" aria-label="Sélection de la couleur de la peluche">
                        
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-12 d-flex justify-content-center">
                <a id="btn-add" href="./cart.html?id=${teddie._id}" class="btn product__item--btn my-3">
                    <span class="fs-5">Ajouter au panier</span> 
                </a>
            </div>
        </article>`;

    createOptions(colors);
}


export { renderOneTeddie, createOptions};