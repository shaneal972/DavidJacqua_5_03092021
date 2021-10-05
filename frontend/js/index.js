import { getTeddies } from './api.js';

// Variables
let divProducts = document.querySelector('#products');
let produits = JSON.parse(localStorage.getItem('panier'));
const plural = document.querySelector('#plural');

if (produits !== null) {
    document.querySelector("#product-in-cart").innerHTML = produits.length;
    produits.length > 1 ? plural.innerHTML = 's' : plural.innerHTML = '';
    console.log(produits.length);
}


let teddies = await getTeddies();

renderTeddies(teddies);

/**
 * Affiche les Teddies dans la page index
 * @param teddies Un tableau de teddie
 */
function renderTeddies(teddies) {

    teddies.forEach(teddie => {
        divProducts.innerHTML += `
            <article class="main__item--product col-12 col-md-6 col-lg col-xl">
                <div class="product__item d-flex flex-column align-items-center">
                    <img class="product__item--img"
                         src="${teddie.imageUrl}"
                         alt="Peluche nommé norbert de couleur marron"
                         width="275"
                         height="202"
                    >
                    <a href="./product.html?id=${teddie._id}" class="btn my-3">
                        <span>Plus d'infos</span> 
                    </a>
                </div>
            </article>`;
    });
}









