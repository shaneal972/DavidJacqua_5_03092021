import {
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
} from './rendered.js';

let numeroCmd = document.querySelector('.num-cmd');
let maCommande = [];
let commande = localStorage.getItem('commande');

if (commande !== null) {
    maCommande.push(JSON.parse(commande));
} else {
    console.log('aucun commande en cours');
};
console.log(maCommande);
if (maCommande.length > 0) {
    renderHeadOfCommand(maCommande);
};


renderQtyOfProduct();    

if (maCommande.length > 0) {
    numeroCmd.innerHTML = maCommande[0].orderId;
    renderBodyOfCommand();
}