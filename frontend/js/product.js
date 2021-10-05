import { getOneTeddie } from "./api.js";
import { renderOneTeddie } from "./rendered.js";


// Variables
let _id = '';
let teddie = {};

/*Afficher un teddie
* 1. Récupérer le teddie depuis l'API en fonction de son _id
*   1-1. Récupérer l'id passer en paramètres de l'url depuis index.html.
*   1-2. Faire l'appel à l'API en GET depuis l'url 'http://localhost:3000/api/teddies/{_id}'
* 2. Afficher le teddie dynamiquement dans la page product.html
*/

// 1.
//  1-1.
let params = new URLSearchParams(document.location.search.substring(1));
_id = params.get("id");

//  1-2.
teddie = await getOneTeddie(_id);

// 2.
renderOneTeddie(teddie);