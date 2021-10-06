import { renderCart } from "./rendered.js";
import { deleteProductAndUpdateCart } from "./utils.js";

/*Afficher les produits du panier
* 1. Récupérer le tableau de produits depuis le localStorage
*   1-1. Récupérer le panier avec la méthode getItem() et le mettre dans le tableau produits
*       avec la méthode JSON.parse().
* 2. Parcourir le tableau et afficher chaque produit dans la page cart.html
*   2-1. Utilisation de la boucle forEach() pour parcourir le tableau
*   2-2. Création de l'élément HTML "li"
*   2-3. Mettre chaque produit dans un élément "li"
*   2-4. Ajouter l'élément "li" au DOM avec innerHTML
*/

renderCart();


window.onload = function () {

    /* Supprimer un produit du panier */
    deleteProductAndUpdateCart();

}
