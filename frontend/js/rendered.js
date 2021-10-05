/* Ensemble de fonctions permettant de rendre des éléments, de les afficher */


// Variables
let divProducts = document.querySelector('#products');



/**
 * Affiche les Teddies dans la page index
 * @param teddies Un tableau de teddie
 */
 function renderTeddies(teddies) {

     //Parcours du tableau de teddies
     teddies.forEach(teddie => {
        // Afficher chaque teddies dans un élément article dans la section#products
        divProducts.innerHTML += `
            <article class="main__item--product col-12 col-md col-lg col-xl mb-3">
                <a href="./product.html?id=${teddie._id}">
                    <div class="product__item d-flex flex-column align-items-center">
                        <img class="product__item--img"
                            src="${teddie.imageUrl}"
                            alt="Peluche nommé ${teddie.name}"
                            width="275"
                            height="202"
                        >
                    <a href="./product.html?id=${teddie._id}" class="btn my-3">
                        Plus d'infos
                    </a>
                    </div>
                </a>
            </article>`;
    });
}


export { renderTeddies };