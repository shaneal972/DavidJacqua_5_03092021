import { getOneTeddie } from "./api.js";
import { renderOneTeddie } from "./rendered.js";
import { getSelectedColor, addProductToCart } from "./utils.js";


// Variables
let _id = '';
let teddie = {};



/*Afficher un teddie
* 1. Récupérer le teddie depuis l'API en fonction de son _id
*   1-1. Récupérer l'id passer en paramètres de l'url depuis index.html.
*   1-2. Faire l'appel à l'API en GET depuis l'url 'http://localhost:3000/api/teddies/{_id}'
* 2. Afficher le teddie dynamiquement dans la page product.html
*/

// 1.
//  1-1.
let params = new URLSearchParams(document.location.search.substring(1));
_id = params.get("id");

//  1-2.
teddie = await getOneTeddie(_id);

// 2.
renderOneTeddie(teddie);


/* Ajouter le produit dans le panier
* 1. Récupérer les informations du produit à ajouter au panier : 
*   l'id, la quantité, la couleur, le prix, le nom
*   1-1. Vérifier la présence du produit dans le panier
*       SI Produit présent : même id et même couleur.
*           ALORS incrémenter sa quantité
*       SINON On l'ajoute au tableau produits[]
*   1-2. Ajouter le tableau produits[] au localStorage en créant la clé panier.
*/

window.onload = async function () {

    // Variables 
    let btnAdd = document.querySelector('#btn-add');    
    
    // Ajout d'un évènement click sur le bouton "AJOUTER AU PANIER"
    btnAdd.addEventListener('click', function () {
        

        // Récupérer les informations du produit à ajouter au panier
        let color = getSelectedColor();
        teddie.color = color;
        teddie.qty = 1

        addProductToCart(teddie);
        document.location.href = './cart.html';
    });

}










