import { getOneTeddie } from "./api.js";
import { renderOneTeddie, renderQtyOfProduct } from "./rendered.js";
import { getSelectedColor, addProductToCart } from "./utils.js";


// Variables
let _id = '';
let teddie = {};

// 1.
//  1-1.
let params = new URLSearchParams(document.location.search.substring(1));
_id = params.get("id");

//  1-2.
teddie = await getOneTeddie(_id);

// 2.
renderOneTeddie(teddie);
    
// Variables 
let btnAdd = document.querySelector('#btn-add');

renderQtyOfProduct();
// Ajout d'un évènement click sur le bouton "AJOUTER AU PANIER"
btnAdd.addEventListener('click', function (event) {
    // event.preventDefault();
    // Récupérer les informations du produit à ajouter au panier
    let color = getSelectedColor();
    teddie.color = color;
    teddie.qty = 1
    
    addProductToCart(teddie);
});









