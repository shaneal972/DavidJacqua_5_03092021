import { getAllTeddies } from "./api.js";
import { renderTeddies, renderQtyOfProduct } from "./rendered.js";


// Variables
let teddies = [];

renderQtyOfProduct();

// 1.
teddies = await getAllTeddies();

// 2.
// Créer le teddie et l'insérer dans le DOM
renderTeddies(teddies);
