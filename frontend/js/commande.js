import {
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
} from './rendered.js';


let maCommande = [];
let params;

renderQtyOfProduct();

params = new URLSearchParams(document.location.search.substring(1));

params.forEach((key, value) => {
    maCommande[value] = key;
})


renderHeadOfCommand(maCommande);

renderBodyOfCommand();