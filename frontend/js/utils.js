/**
 * Permet de formatter un prix passé en paramètres : Passer de 3900 à 39,00
 * @param {*} price 
 * @returns Le prix formatté sous la forme : XX,XX
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



export { formattedPrice, getSelectedColor };