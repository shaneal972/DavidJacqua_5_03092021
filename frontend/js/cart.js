import { renderCart, renderInfosOfCartInPage } from "./rendered.js";
import { validate, id, classes } from "./form.js";
import { postCommand } from "./api.js";
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
    let btnCmd = id('btn-cmd');
    let commande = {};
    let products = [];


    /* Supprimer un produit du panier */
    deleteProductAndUpdateCart();

    /* Changer la quantité d'un produit du panier affiché*/
    productQtyChange(liElts);

    /* Mettre à jour les informations du panier sur la page */
    renderInfosOfCartInPage();

    /* Validation du formulaire avant de le poster */
    let firstname = id('firstname'),
        lastname = id('lastname'),
        address = id('address'),
        city = id('city'),
        email = id('email');
    
    
    btnCmd.addEventListener('click', function (event) {
        let validFirstName = validate(firstname, 0, "Le prénom ne doit pas être vide et doit être supérieur à 2 caractères");
        let validLastName = validate(lastname, 1, "Le nom ne doit pas être vide et doit être supérieur à 2 caractères");
        let validAddress = validate(address, 2, "L'adresse ne doit pas être vide et doit être supérieur à 2 caractères");
        let validCity = validate(city, 3, "La ville ne doit pas être vide et doit être supérieur à 2 caractères");
        let validEmail = validate(email, 4, "");

        if (
            validFirstName === true &&
            validLastName === true &&
            validAddress === true &&
            validCity === true &&
            validEmail === true
        ) {
            //On crée l'objet contact 😅 
            let contact = {
                firstName: firstname.value,
                lastName: lastname.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }
            
            //On récupère le tableau d'id du panier 🛍  
            let produits = JSON.parse(localStorage.getItem('panier'));

            //On met les id du panier dans le tableau products
            produits.forEach(p => {
                products.push(p._id);
            });

            //Envoi des informations du client et du panier au serveur en méthode POST
            postCommand(contact, products);
        }
        
    })
}