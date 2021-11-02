import {
    renderQtyOfProduct,
    renderHeadOfCommand,
    renderBodyOfCommand
} from './rendered.js';

import {
    getParamsInUrl
} from './utils.js'

//variables
let maCommande = [];
let params;

renderQtyOfProduct();

params = getParamsInUrl();

params.forEach((key, value) => {
    maCommande[value] = key;
})


renderHeadOfCommand(maCommande);

renderBodyOfCommand();

// Suppression du panier dans le localStorage
localStorage.removeItem('panier');