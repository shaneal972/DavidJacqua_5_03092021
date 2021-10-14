import {
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
} from './rendered.js';

let numeroCmd = document.querySelector('.num-cmd');
let totalCmd = document.querySelector('.toal-cmd');
let maCommande = [];
let commande = localStorage.getItem('commande');
let panier = localStorage.getItem('panier');
let monPanier = [];

if (commande !== null) {
    // console.log(commande);
    maCommande.push(JSON.parse(commande));
}

if (panier !== null) {        
    monPanier.push(JSON.parse(panier));
}

// console.log(maCommande);
if (maCommande.length > 0) {
    renderHeadOfCommand(maCommande);
}

window.onload = () => {

    renderQtyOfProduct();    

    if (maCommande.length > 0) {
        numeroCmd.innerHTML = maCommande[0].orderId;
        renderBodyOfCommand();
    }
}