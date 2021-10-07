import { renderCart, renderInfosOfCartInPage } from "./rendered.js";
import {
    deleteProductAndUpdateCart,
    deleteProductWhenInputChange,
    formattedPrice,
    productQtyChange
} from "./utils.js";


/*Afficher les produits du panier*/
renderCart();


window.onload = function () {

    // Variables
    let liElts = document.querySelectorAll('.product__item');


    /* Supprimer un produit du panier */
    deleteProductAndUpdateCart();

    /* Changer la quantité d'un produit du panier affiché*/
    productQtyChange(liElts);

    /* Mettre à jour les informations du panier sur la page */
    renderInfosOfCartInPage();

}
