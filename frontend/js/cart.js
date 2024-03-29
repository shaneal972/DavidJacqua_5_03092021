import { renderCart, renderInfosOfCartInPage } from "./rendered.js";
import { validate, id } from "./form.js";
import { postCommand } from "./api.js";
import {
    deleteProduct,
    productQtyChange
} from "./utils.js";


/*Afficher les produits du panier*/
renderCart();

// Variables
let mesProduits = [];
let liElts = document.querySelectorAll('.product__item');
let btnCmd = id('btn-cmd');
let products = [];


/* Les produits du panier dans le localStorage */
if (localStorage.getItem('panier') !== null) {
    JSON.parse(localStorage.getItem('panier')).forEach(p => {
        mesProduits.push(p);
    })
}


/* Supprimer un produit du panier */
deleteProduct();

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


btnCmd.addEventListener('click', async function (event) {
    let commande;
    // event.preventDefault();
    let validFirstName = validate(firstname, 0, "Le prénom ne doit pas être vide et doit être supérieur à 2 caractères et ne peut contenir de nombre");
    let validLastName = validate(lastname, 1, "Le nom ne doit pas être vide et doit être supérieur à 2 caractères et ne peut contenir de nombre");
    let validAddress = validate(address, 2, "L'adresse ne doit pas être vide et doit être supérieur à 2 caractères");
    let validCity = validate(city, 3, "La ville ne doit pas être vide et doit être supérieur à 2 caractères");
    let validEmail = validate(email, 4, "Ce champ de mail ne doit pas être vide");

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
        
        if (mesProduits !== null) {
            
            //On met les id du panier dans le tableau products
            mesProduits.forEach(p => {
                products.push(p._id);
            });
    
            //Envoi des informations au serveur par la méthode POST
            try {
                commande = await postCommand(contact, products);
                //Passage des infos commandes en paramètres de l'URL
                document.location = `
                commande.html?orderId=${commande.orderId}
                &address=${commande.contact.address}
                &city=${commande.contact.city}
                &firstname=${commande.contact.firstName}`;
            } catch(error) {
                console.log(error.message);
            }
        }

    } else {
        event.preventDefault();
    }
});