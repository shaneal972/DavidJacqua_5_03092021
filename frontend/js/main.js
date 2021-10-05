import { getAllTeddies } from "./api.js";
import { renderTeddies } from "./rendered.js";

/*Afficher tous les teddies
* 1. Récupérer les teddies depuis l'API
* 2. Afficher les teddies dynamiquement dans la page index.html
*/

// Variables
let teddies = [];

// 1.
teddies = await getAllTeddies();

// 2.
// Créer le teddie et l'insérer dans le DOM
renderTeddies(teddies);