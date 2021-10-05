/* Ensemble de fonctions utiles pour le site */

let productsInCart = localStorage.getItem('panier');
let myProducts = [];

/**
 * Permet de formatter un prix passé en paramètres : Passer de 3900 à 39,00
 * @param {*} price 
 * @returns {Float} price Le prix formatté sous la forme : XX,XX
 */
 function formattedPrice(price) {
    price = price.toString()
    price = parseFloat(price.substring(0,2));
    price = price.toFixed(2);
    price = price.replace('.', ',');

    return price;
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
}

/**
 * Permet de vérifier la présence du produit (product) dans le panier ou non.
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




export { formattedPrice, getSelectedColor, productInCart, addProductToCart };