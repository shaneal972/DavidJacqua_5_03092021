import { getAllTeddies } from "./api.js";
import { renderTeddies, renderQtyOfProduct } from "./rendered.js";


// Variables
let teddies = [];

renderQtyOfProduct();

// teddies = await getAllTeddies();

// Récupération des teddies en utilisant .then et .catch
getAllTeddies()
    .then(
        (response) => {
            teddies = response;
            // Créer le teddie et l'insérer dans le DOM
            renderTeddies(teddies);
        }
    )
    .catch((error) => response.status(400).json({
        error: error
    }));

