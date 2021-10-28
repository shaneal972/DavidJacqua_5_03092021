import { getOneTeddie } from "./api.js";
import { renderOneTeddie, renderQtyOfProduct } from "./rendered.js";
import { getSelectedColor, addProductToCart } from "./utils.js";


// Variables
let _id = '';
let teddie = {};


let params = new URLSearchParams(document.location.search.substring(1));
_id = params.get("id");

teddie = await getOneTeddie(_id);

renderOneTeddie(teddie);

let btnAdd = document.querySelector('#btn-add');
renderQtyOfProduct();

// Ajout d'un évènement click sur le bouton "AJOUTER AU PANIER"
btnAdd.addEventListener('click', function (event) {
    // Récupérer la couleur du produit à ajouter au panier
    let color = getSelectedColor();
    teddie.color = color;

    //Passer sa quantité à 1
    teddie.qty = 1
    
    addProductToCart(teddie);
});









