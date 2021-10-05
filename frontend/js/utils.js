/* Ensemble de fonctions utiles pour le site */

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


export { formattedPrice };