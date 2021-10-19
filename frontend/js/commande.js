import {
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
} from './rendered.js';

let numeroCmd = document.querySelector('.num-cmd');
let maCommande = [];
let commande;

renderQtyOfProduct();    

if (localStorage.getItem('commande') !== null && localStorage.getItem('commande') !== undefined) {
    commande = JSON.parse(localStorage.getItem('commande'));

    maCommande.push(commande);
    renderHeadOfCommand(maCommande);
} 



if (maCommande.length > 0) {
    numeroCmd.innerHTML = maCommande[0].orderId;
    renderBodyOfCommand();
}