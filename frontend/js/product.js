import { getOneTeddie } from './api.js';
import { formattedPrice, getSelectedColor } from './utils.js';
import { renderOneTeddie } from './rendered.js';

let teddie = await getOneTeddie();

renderOneTeddie(teddie);

window.onload = async function () {

    //Tableau de produits
    let myProducts = [];

    const produits = localStorage.getItem('panier');

    /* Création d'un évènement sur le bouton 'AJOUTER AU PANIER'*/
    // Sélection du bouton 
    let btnAdd = document.querySelector('#btn-add');
    
    //Ajout de l'évènement click sur le bouton
    btnAdd.addEventListener("click", function (event) {
        //Désactivation du comportement par défault du bouton
        // event.preventDefault();
        
        //Récupération de la couleur choisie par l'utilisateur
        const color = getSelectedColor();

        if (produits === null) {

            teddie.color = color;
            teddie.price = parseFloat(formattedPrice(teddie.price));

            //Ajout de l'objet dans le tableau myProducts[]
            myProducts.push(teddie);
            
            //Ajout du tableau myProducts dans le localStorage
            localStorage.setItem('panier', JSON.stringify(myProducts));
        }

        if (produits !== null) {
            myProducts = JSON.parse(produits);
            let filteredProducts = myProducts.filter(function (product) {
                // filtre le tableau myProducts selon l'id et la couleur
                return product.id === _id && product.color === color;
            });
            console.log(filteredProducts);
            if (filteredProducts.length !== 0) {
                filteredProducts[0].qty++;
                myProducts.forEach(p => {
                    if (p.id === _id && p.color === color) {
                        p.qty = filteredProducts[0].qty++;
                    }
                });
                document.location.href = './cart.html';
            } 
            
            localStorage.setItem('panier', JSON.stringify(myProducts));
        }
    });
};



