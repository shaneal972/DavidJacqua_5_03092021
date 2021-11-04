import { renderPriceCartByQty, renderInfosOfCartInPage } from './rendered.js';

/* Ensemble de fonctions utiles pour le site */


// Variables
let productsInCart = localStorage.getItem('panier');
let myProducts = JSON.parse(productsInCart);
let mesProduits = [];
let qte = 0;


/**
 * Permet de formatter un prix passé en paramètres : Passer de 3900 à 39,00
 * @param {*} price 
 * @returns {Float} price Le prix formatté sous la forme : XX,XX
 */
function formattedPrice(price) {
    price = price.toString();
    price = price.slice(0, (price.length - 2));
    price = Number.parseFloat(price).toFixed(2);
    price = price.toString().replace('.', ',');

    return price;
};

/**
 * Permet de récupérer des informations du panier
 * @returns {Array} 
 */
 function getInfosInCartByName(name, color) {
    let product = {
        price: 0,
        qte: 0,
        name: '',
        image: ''
     };
     let arrayOfProduct = new Array();

    myProducts.forEach(mp => {
        if (name === mp.name && color === mp.color) {
            product.price = mp.price;
            product.qte = mp.qty;
            product.name = mp.name;
            product.image = mp.imageUrl;
            arrayOfProduct.push(product);
        }
    });
    

    return arrayOfProduct;
};

/**
 * Permet de mettre un background coloré sur le nom de la couleur du produit
 */
function addColorToElt() {

    let spans = document.querySelectorAll("#product-color");

    for (let i = 0; i < spans.length; i++) {

        let namedColor = spans[i].innerHTML;
        switch (namedColor) {
        
            case 'Pink':
                spans[i].classList.add('bg-pink');
                break;
            case 'Tan':
                spans[i].classList.add('bg-tan');
                break;
            case 'White':
                spans[i].classList.add('bg-white');
                break;
            case 'Chocolate':
                spans[i].classList.add('bg-chocolate');
                break;
            case 'Brown':
                spans[i].classList.add('bg-brown');
                break;
            case 'Beige':
                spans[i].classList.add('bg-dark-beige');
                break;
        }

        if (namedColor.includes(' ')) {
            namedColor = namedColor.replace(' ', '-').toLowerCase();
            if (namedColor == 'pale-brown') {
                spans[i].classList.add('bg-pale-brown');
            }

            if (namedColor == 'dark-brown') {
                spans[i].classList.add('bg-dark-brown');
            }
            spans[i].classList.add(namedColor);
        } else {
            namedColor = namedColor.toLowerCase();
            spans[i].classList.add(namedColor);
        }
    }
};

/**
 * Permet de récupérer la valeur de l'option sélectionnée
 * @returns {String} La valeur de l'option sélectionnée
 */
 function getSelectedColor() {
    // récupération du select 
    let selectElt = document.querySelector('#colors');
    
    // récupération de l'option sélectionné
    let selectedElt = selectElt.options[selectElt.selectedIndex];
    
    // récupération de la valeur de l'option sélectionné
    let text = selectedElt.text;
    
    return text;
};

/**
 * Permet de vérifier la présence du produit (product) dans le panier.
 * @param {Object} product 
 * @returns {boolean} inCart 
 */
function productInCart(product) {
    let inCart = false;

    // Vérifier la présence du produit (product) dans le panier (productsInCart) 
    for (const p of myProducts) {
        if (product._id === p._id && product.color === p.color) {
            inCart = true;
        }
    }
    
    return inCart;
};

 /**
 * Permet d'ajouter un produit (product) dans le panier 
 * @param {Object} product 
 */
function addProductToCart(product) {

    if (productsInCart !== null) {

        // Vérifier si le produit à ajouter est déjà dans le panier
        let inCart = productInCart(product);

        if (inCart === true) {
            for (const p of myProducts) {
                if (product._id === p._id && product.color === p.color) {
                    // Incrémente la quantité du produit dans le panier
                    p.qty += 1;
                }
            }

            // Mise à jour du panier dans le localStorage
            localStorage.setItem('panier', JSON.stringify(myProducts));
        };

        if (inCart === false) {
            myProducts.push(product);
            localStorage.setItem('panier', JSON.stringify(myProducts));
        }
    } else {
        // Ajout du produit (product) dans myProducts[]
        mesProduits.push(product);
        // Création du panier dans le localStorage
        localStorage.setItem('panier', JSON.stringify(mesProduits));
    }
};

/**
 * Permet de supprimer un élément de la liste d'affichage des produits
 * sur la page cart.html et met à jour le panier du Storage
 */
function deleteProduct() {
    const btnsDel = document.querySelectorAll('.product__delete');
    let productsDelete = [];
    let product;
    let liElt;
    btnsDel.forEach(btn => {
        btn.addEventListener('click', function () {
            liElt = btn.closest('li');
            liElt.remove();
            product = getInfosOfProductInCartPage(liElt);
            productsDelete.push(product);
            updateCartInStorageAfterDelete(productsDelete);
            renderInfosOfCartInPage();
        })
    });
};

/**
 * Permet de mettre à jour le panier du Storage
 * @param {Array} products 
 */
function updateCartInStorageAfterDelete(products) {

    myProducts.forEach(product => {
        products.forEach(p => {
            if (p.name === product.name && p.color === product.color) {
                myProducts.splice(myProducts.indexOf(product), 1);
            }
        })
        localStorage.setItem('panier', JSON.stringify(myProducts));
    })
};

/**
 * Permet de mettre à jour le panier du Storage après un changement de quantité
 * d'un produit du panier
 * @param {Array} products 
 */
function updateCartAfterQtyChange(products) {

    myProducts.forEach(product => {
        products.forEach(p => {
            if (p.name === product.name && p.color === product.color) {
                product.qty = p.qty;
            }
        })
        localStorage.setItem('panier', JSON.stringify(myProducts));
    })
};

/**
 * Permet de supprimer un élément de la liste d'affichage des produits
 * sur la page cart.html lorsque la quantité du produit est 0
 * @param {HTMLInputElement} input
 */
 function deleteProductWhenInputChange(input) {
    
    let productsDelete = [];    

    let liElt = input.closest('li');
    liElt.remove();
    let product = getInfosOfProductInCartPage(liElt);
    productsDelete.push(product);
     updateCartInStorageAfterDelete(productsDelete);
     renderInfosOfCartInPage();
};

/**
 * Permet de recupérer les infos d'un produit sur la pagge cart.html
 * @param {HTMLLIElement} li 
 * @returns {object} product
 */
function getInfosOfProductInCartPage(li) {

    let productInPage = {
        name: li.querySelector('#product-name').innerHTML,
        color: li.querySelector('#product-color').innerHTML,
        qty: Number(li.querySelector('#input-qte').value)
    }

    return productInPage;
}

/**
 * Permet de changer les informations d'un produit si la quantité change
 * @param {HTMLLIElement} elts 
 */
function productQtyChange(elts) {
    let product = [];
    let input;
    elts.forEach(li => {
        li.addEventListener('click', function (event) {
            if (event.target.innerHTML === '+') {
                input = li.querySelector('#input-qte');
                qte = Number(input.value);
                qte++;
                input.setAttribute('value', qte.toString());
                // Affiche le prix multiplié par la quantité 
                renderPriceCartByQty(qte, li);
                // Récupère informations du produit
                product = getInfosOfProductInCartPage(li);
                updateCartAfterQtyChange(Array(product));
                renderInfosOfCartInPage();
            }
            if (event.target.innerHTML === '-') {
                input = li.querySelector('#input-qte');
                qte = Number(input.value);
                qte--;
                input.setAttribute('value', qte.toString());
                // Affiche le prix multiplié par la quantité 
                renderPriceCartByQty(qte, li);
                // Récupère informations du produit
                product = getInfosOfProductInCartPage(li);
                updateCartAfterQtyChange(Array(product));
                
                if (qte < 0 || qte === NaN) {
                    qte = 1;
                    input.setAttribute('value', qte.toString());
                }
                if (qte === 0) {
                    deleteProductWhenInputChange(input)
                }
                renderInfosOfCartInPage();
            }
        });
    });
};

/**
 * Permet de retourner la quantité de produits dans le panier
 * @returns {Integer} Quantité de produit
 */
function qteProductInCart() {
    if (productsInCart !== null) {
        myProducts.forEach(p => {
            mesProduits.push(p);
        });
    };
    mesProduits.forEach(mp => {
        qte += mp.qty;
    });
    return qte;
};


/**
 * Permet de retourner la date en français "samedi 09 octobre 2021"
 * @returns {Date} Date en français
 */
let Now = () => {
    let date = new Date();
    let options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("fr-FR", options);
};

/**
 * Permet de mettre au pluriel un mot en lui ajoutant un 's' ou pas.
 * @param {Number} qte 
 * @returns {String} plurals
 */
function showPlural(qte) {
    let plurals = '';
    qte === 0 || qte === 1 ? plurals : plurals = 's';

    return plurals;
}

/**
 * Permet de récupérer les params depuis une URL
 */
function getParamsInUrl() {
    let params; 
    
    params = new URLSearchParams(document.location.search.substring(1));

    return params;
}

export {
    formattedPrice,
    getInfosInCartByName,
    getSelectedColor,
    productInCart,
    addProductToCart,
    deleteProduct,
    updateCartInStorageAfterDelete,
    addColorToElt,
    deleteProductWhenInputChange,
    productQtyChange,
    qteProductInCart,
    Now,
    showPlural,
    getParamsInUrl
};