import { renderPriceCartByQty } from './rendered.js';

/* Ensemble de fonctions utiles pour le site */


// Variables
let productsInCart = localStorage.getItem('panier');
let myProducts = [];
let product = {};
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
 * Permet de coloré le nom de la couleur du produit par sa couleur 
 */
function addColorToElt() {

    let spans = document.querySelectorAll("#product-color");
    // let namedColor = '';

    for (let i = 0; i < spans.length; i++) {
        let namedColor = spans[i].innerHTML;

        if (namedColor == 'White') {
            spans[i].classList.add('bg-dark');
        }

        if (namedColor == 'Beige') {
            spans[i].classList.add('bg-dark-beige');
        }

        if (namedColor.includes(' ')) {
            namedColor = namedColor.replace(' ', '-').toLowerCase();
            spans[i].classList.add(namedColor);
        } else {
            namedColor = namedColor.toLowerCase();
            spans[i].classList.add(namedColor);
        }
    }
}


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
}

/**
 * Permet de vérifier la présence du produit (product) dans le panier.
 * @param {Object} product 
 * @returns {boolean} inCart 
 */
function productInCart(product) {
    myProducts = JSON.parse(productsInCart);
    let inCart = false;

    // Vérifier la présence du produit (product) dans le panier (productsInCart) 
    for (const p of myProducts) {
        if (product._id === p._id && product.color === p.color) {
            inCart = true;
        }
    }
    
    return inCart;
}

 /**
 * Permet d'ajouter un produit (product) dans le panier 
 * @param {Object} product 
 */
function addProductToCart(product) {

    if (productsInCart !== null) {
        myProducts = JSON.parse(productsInCart);
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
        myProducts.push(product);
        // Création du panier dans le localStorage
        localStorage.setItem('panier', JSON.stringify(myProducts));
    }
}

/**
 * Permet de récupérer le nom 'name' et la couleur 'color' d'un produit de la liste
 * @param {HTMLLIElement} li 
 * @returns {Object} product
 */
function getInfosInListe(li) {
    
    product = {
        name: li.querySelector('#product-name').innerHTML,
        color: li.querySelector('#product-color').innerHTML,
        qty: Number(li.querySelector('#input-qte').value)
    }

    return product;
}

/**
 * Permet de supprimer un élément de la liste d'affichage des produits
 * sur la page cart.html et met à jour le panier du Storage
 */
function deleteProductAndUpdateCart() {
    const btnsDel = document.querySelectorAll('.product__delete');
    let productsDelete = [];
    btnsDel.forEach(btn => {
        btn.addEventListener('click', function (event) {
            let liElt = btn.closest('li');
            liElt.remove();
            let product = getInfosInListe(liElt);
            productsDelete.push(product);
            updateCartInStorageAfterDelete(productsDelete);
            location.reload();
        })
    });
}

/**
 * Permet de mettre à jour le panier du Storage
 * @param {Array} products 
 */
function updateCartInStorageAfterDelete(products) {
    myProducts = JSON.parse(productsInCart);

    myProducts.forEach(product => {
        products.forEach(p => {
            if (p.name === product.name && p.color === product.color) {
                myProducts.splice(myProducts.indexOf(product), 1);
            }
        })
        localStorage.setItem('panier', JSON.stringify(myProducts));
    })
}


/**
 * Permet de mettre à jour le panier du Storage après un changement de quantité
 * d'un produit du panier
 * @param {Array} products 
 */
function updateCartAfterQtyChange(products) {
    myProducts = JSON.parse(productsInCart);

    myProducts.forEach(product => {
        products.forEach(p => {
            if (p.name === product.name && p.color === product.color) {
                product.qty = p.qty;
            }
        })
        localStorage.setItem('panier', JSON.stringify(myProducts));
    })
}

/**
 * Permet de supprimer un élément de la liste d'affichage des produits
 * sur la page cart.html lorsque la quantité du produit est 0
 * et met à jour le panier du Storage
 * @param {HTMLInputElement} input
 */
 function deleteProductWhenInputChange(input) {
    
    let productsDelete = [];    

    let liElt = input.closest('li');
    liElt.remove();
    let product = getInfosInListe(liElt);
    productsDelete.push(product);
    updateCartInStorageAfterDelete(productsDelete);
}

/**
 * Permet de changer les informations d'un produit si la quantité change
 * @param {HTMLLIElement} elts 
 */
function productQtyChange(elts) {
    elts.forEach(li => {
        li.addEventListener('click', function (event) {
            if (event.target.innerHTML === '+') {
                let input = li.querySelector('#input-qte');
                qte = Number(input.value);
                qte++;
                input.setAttribute('value', qte.toString());
                // Affiche le prix multiplié par la quantité 
                renderPriceCartByQty(qte, li);
                // Récupère informations du produit
                let product = getInfosInListe(li);
                console.log(Array(product));
                updateCartAfterQtyChange(Array(product));
                location.reload();
            }
            if (event.target.innerHTML === '-') {
                let input = li.querySelector('#input-qte');
                qte = Number(input.value);
                qte--;
                input.setAttribute('value', qte.toString());
                // Affiche le prix multiplié par la quantité 
                renderPriceCartByQty(qte, li);
                // Récupère informations du produit
                let product = getInfosInListe(li);
                console.log(Array(product));
                updateCartAfterQtyChange(Array(product));
                
                if (qte < 0 || qte === NaN) {
                    qte = 1;
                    input.setAttribute('value', qte.toString());
                }
                if (qte === 0) {
                    deleteProductWhenInputChange(input)
                }
                location.reload();
            }
        });
    });
}

/**
 * Met au pluriel un mot en lui ajoutant un 's' ou pas.
 * @param {Number} qte 
 * @returns {String} plurals
 */
function showPlural(qte) {
    let plurals = '';
    qte === 0 || qte === 1 ? plurals : plurals = 's';

    return plurals;
}

export {
    formattedPrice,
    getSelectedColor,
    productInCart,
    addProductToCart,
    deleteProductAndUpdateCart,
    updateCartInStorageAfterDelete,
    addColorToElt,
    deleteProductWhenInputChange,
    productQtyChange,
    showPlural
};