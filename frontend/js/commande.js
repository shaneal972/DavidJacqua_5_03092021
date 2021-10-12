import { renderQtyOfProduct, renderHeadOfCommand, renderProductsOfCommand, createElementLiOfCommand } from './rendered.js';

let numeroCmd = document.querySelector('.num-cmd');
let totalCmd = document.querySelector('.toal-cmd');
let maCommande = [];
let commande = localStorage.getItem('commande');
let panier = localStorage.getItem('panier');
let monPanier = [];

if (commande !== null) {        
    maCommande.push(JSON.parse(commande));
}

if (panier !== null) {        
    monPanier.push(JSON.parse(panier));
}

renderHeadOfCommand(maCommande);

window.onload = () => {
    let li = '';
    let total = 0;
    let color = '';
    let eltUL = document.querySelector('.list-group');
    let totalCmd = document.querySelector('.total-cmd');

    renderQtyOfProduct();    

    numeroCmd.innerHTML = maCommande[0].orderId;
    renderProductsOfCommand(maCommande);

   
}