/* Ensemble de fonctions permettant de rendre des éléments, de les afficher */
import {
    formattedPrice,
    addColorToElt,
    showPlural,
    qteProductInCart
} from "./utils.js";

// Variables
let divProducts = document.querySelector('#products');
let cart = localStorage.getItem('panier');
let ulElt = document.querySelector('.list-group');
let card = document.querySelector('.card');

let myProducts = [];


/**
 * Affiche les Teddies dans la page index
 * @param teddies Un tableau de teddie
 */
 function renderTeddies(teddies) {

     //Parcours du tableau de teddies
     teddies.forEach(teddie => {
        // Afficher chaque teddies dans un élément article dans la section#products
        divProducts.innerHTML += `
            <article class="main__item--product col-12 col-md col-lg col-xl mb-3">
                <a href="./product.html?id=${teddie._id}">
                    <div class="product__item d-flex flex-column align-items-center">
                        <img class="product__item--img"
                            src="${teddie.imageUrl}"
                            alt="Peluche nommé ${teddie.name}"
                            width="275"
                            height="202"
                        >
                    <a href="./product.html?id=${teddie._id}" class="btn btn-outline-dark my-3">
                        Plus d'infos
                    </a>
                    </div>
                </a>
            </article>`;
    });
}

/**
 * Permet de créer les options de la balise select du produit à afficher
 * @param {*} options 
 */
 function createOptions(options) {
    
    // Sélection du select où l'on crée les options
    let selectElt = document.querySelector('#colors');
    // Parcourt du tableau options[]
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
    let sectionProduct = document.querySelector('#product');

    //Ajout du produit dans la section de la page produit.html
    sectionProduct.innerHTML = `
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
                <a id="btn-add" href="./cart.html" class="btn btn-outline-dark product__item--btn my-3">
                    <span class="fs-5">Ajouter au panier</span> 
                </a>
            </div>
        </article>`;

    createOptions(colors);
}

/**
 * Permet de créer un élément "li" à insérer dans le DOM
 * @param {Object} product 
 * @returns {HTMLLIElement}
 */
function createProduct(product) {
    let cartElt = '';

    cartElt = `
        <li class="list-group-item d-flex justify-content-between product__item bg-primary">
            <div class="d-flex align-items-center">
                <img class="mr-3" src="${product.imageUrl}" alt="image d'une peluche" width="105" height="70">
                <p class="fs-6 infos__product mt-1 mb-0">
                    <span id="product-name" class="fw-bold">${product.name}</span> <br>
                    <span class="d-none d-sm-inline-block">Prix unitaire :</span> <span id="product-price">${formattedPrice(product.price)}</span>€ <br>
                    <span id="product-color" class="infos__product--color d-block">${product.color}</span>
                </p>
            </div>
            <div class="infos__product--qte mx-3 py-2">
                <div class="d-flex btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group-sm mr-2 d-block" role="group" aria-label="First group">
                    <button id="btn-moins" type="button" class="btn-cart btn-secondary">-</button>
                    </div>
                    <div class="input-group-sm product__qte--input d-block">
                    <input id="input-qte" type="text" data-qty=${product.qty} class="form-control" value="${product.qty}">
                    </div>
                    <div class="btn-group-sm mr-2 d-block" role="group" aria-label="First group">
                        <button id="btn-plus" type="button" class="btn-cart btn-secondary">+</button>
                    </div>
                </div>
            </div>
            <div class="py-2 mx-2 info-product-price">
                <span id="cart-price">${(parseFloat(formattedPrice(product.price)) * product.qty).toFixed(2).replace('.', ',')}</span><span class="d-none d-sm-inline"> €</span>
            </div>
            <p class="py-2 product__delete" title="supprimer l'article">
            X
            </p>
        </li>`;
    
    return cartElt;
}

/**
 * Permet d'afficher les produits du panier dans l'élément "ul"  
 * de la page cart.html
 */
function renderCart() {

    let li = '';
    if (cart !== null) {
        let productsInCart = JSON.parse(cart);
        productsInCart.forEach(product => {
            li += createProduct(product);
        });
    }

    ulElt.innerHTML = li;
    addColorToElt();
}

/**
 * Permet d'afficher le prix du produit en fonction de la quantité 
 * du produit.
 * @param {Number} qty 
 * @param {HTMLLIElement} li 
 */
function renderPriceCartByQty(qty, li) {
    
    let cartPrice = li.querySelector('#cart-price');
    let productPrice = li.querySelector('#product-price');
    let priceInCart = qty * parseFloat(productPrice.innerHTML);
    priceInCart = priceInCart + '00';
    cartPrice.innerHTML = formattedPrice(priceInCart);
}

/**
 * Permet de mettre à jour la page avec les informations du panier
 * présent dan sle localStorage
 */
function renderInfosOfCartInPage() {
    const nbProducts = document.querySelectorAll('.nb-product');
    const cartPrices = document.querySelectorAll('#cart-price');
    const plural = document.querySelector('#plural');
    const priceTotalOfProduct = document.querySelector('#price-total-of-product');
    const shipPrice = document.querySelector('#ship-price');
    const priceTotalOfCart = document.querySelector('#price-total-of-cart');
    let inputQte = document.querySelectorAll('#input-qte');
    let qtyOfProducts = 0;
    let priceTotalProduct = 0;
    let priceTotalCart = 0;
    let tax = 0;

    // Calcul de la quantité de produits du panier
    inputQte.forEach(input => {
        qtyOfProducts += Number(input.value);
    });

    // Affiche la quantité de produit 
    nbProducts.forEach(np => {
        np.innerHTML = qtyOfProducts;
    });

    // Mise au pluriel du mot produit dans le header de la page
    plural.innerHTML = showPlural(qtyOfProducts);

    // Affiche le prix total des produits
    cartPrices.forEach(cp => {
        priceTotalProduct += parseFloat(cp.innerHTML);
    });
    priceTotalProduct = priceTotalProduct + '00';
    priceTotalOfProduct.innerHTML = formattedPrice(priceTotalProduct);

    // Affiche le prix total du panier
    shipPrice.innerHTML === 'gratuit' ? tax = 0 : tax = parseFloat(shipPrice.innerHTML);
    priceTotalCart = (tax + parseFloat(priceTotalOfProduct.innerHTML));
    priceTotalCart += '00';
    priceTotalOfCart.innerHTML = formattedPrice(priceTotalCart);
    
}

/**
 * Permet de renseigner la quantité de produits dans le header
 * si panier n'est pas vide.
 */
function renderQtyOfProduct() {
    let url = new URL(document.location);
    let page = url.pathname.slice(10);
    let qte = 0;
    let productInCart;
    let plural;
    if ((page === 'index.html') || (page === 'product.html') || page === 'commande.html') {
        productInCart = document.querySelector('#product-in-cart');
        plural = document.querySelector('#plural');
        qte = qteProductInCart();
        productInCart.innerHTML = qte;
        // Mise au pluriel du mot produit dans le header de la page
        plural.innerHTML = showPlural(qte);
    }
}

/**
 * Permet de retourner la date en français "samedi 09 octobre 2021"
 * @returns {Date} Date en français
 */
let Now = () => {
    let date = new Date();
    let options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
    return date.toLocaleDateString("fr-FR", options);
}


/**
 * Permet de rendre l'entête d'une commade
 * @param {*} commande 
 */
let renderHeadOfCommand = (commande) => {
    
    let cmdElt = '';
  
    cmdElt += `
        <div class="card-body">
            <h5 class="card-title text-center">N° commande : </h5>
            <h6 class="num-cmd text-center text-danger fw-bold fs-4"> ${commande[0].orderId}</h6>
            <p class="card-text">
                <span class="text-info">${commande[0].contact.firstName}</span> nous vous remercions pour votre achat 
                et espérons qu'il répondra à vos attentes. <br>
                <span class="py-2 d-block">Vous trouverez ci-dessous le résumé de votre achat :</span>
            </p>
        </div>
        <div class="card-body row">
            <div class="card-text col-sm col-md-6">
                Envoyé à : <br>
                <address class="text-info">
                    ${commande[0].contact.address} <br>
                    ${commande[0].contact.city}
                </address> 
            </div>
            <div class="card-text col-sm col-md-6">
                <p>Date de l'achat : <br>
                 <span class="text-info">${Now()}</span>
                </p>
            </div>
        </div>
        <ul class="list-group list-group-flush px-1">
        </ul>`;
    
    card.innerHTML = cmdElt;

}

/**
 * Permet de rendre (d'afficher) le corps d'une commande
 */
let renderBodyOfCommand = () => {
    //Variables
    let quantites = [];
    let prices = [];
    let bodyCardElt = '';
    let bodyOfCard = document.querySelector('#body-of-card');
    let totalQte = 0;
    let total = 0;

    //Récupération des quantités et des prix du panier
    myProducts = JSON.parse(cart);
    myProducts.forEach(mp => {
        quantites.push(mp.qty);
        prices.push(mp.price);
    });

    //Calcul de la quantité de produit et du prix total
    let i = 0;
    while (i < quantites.length) {
        total += (quantites[i] * prices[i]);
        totalQte += quantites[i];
        i++;
    }

    //Création de l'élément à afficher dans l'HTML
    bodyCardElt += `
        <div class="card-body">
            <p class="card-text info-qte-commande">
                Votre commande contenait <span id="qte">${totalQte}</span> produits. Vous trouverez 
                le montant total ci-dessous.
            </p>
            <p class="text-end">
                Total : 
                <span class="total-cmd text-danger fw-bold fs-3">${formattedPrice(total)}</span>
                <span class="text-danger fw-bold fs-3"> € </span>
            </p>
        </div>`;    

    // Insertion de l'elt dans la page commande.html
    bodyOfCard.innerHTML = bodyCardElt;
}


export {
    renderTeddies,
    createOptions,
    renderOneTeddie,
    renderCart,
    createProduct,
    renderPriceCartByQty,
    renderInfosOfCartInPage,
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
};