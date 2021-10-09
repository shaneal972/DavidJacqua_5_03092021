import { renderQtyOfProduct, renderHeadOfCommand, renderProductsOfCommand } from './rendered.js';

let numeroCmd = document.querySelector('.num-cmd');
let totalCmd = document.querySelector('.toal-cmd');
let maCommande = [];
let commande = localStorage.getItem('commande');

if (commande !== null) {        
    maCommande.push(JSON.parse(commande));
}

renderHeadOfCommand(maCommande);

window.onload = () => {
    renderQtyOfProduct();    

    numeroCmd.innerHTML = maCommande[0].orderId;
    renderProductsOfCommand();
}