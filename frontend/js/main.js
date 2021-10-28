import { getAllTeddies } from "./api.js";
import { renderTeddies, renderQtyOfProduct } from "./rendered.js";


// Variables
let teddies = [];

renderQtyOfProduct();

teddies = await getAllTeddies();

// Créer le teddie et l'insérer dans le DOM
renderTeddies(teddies);
