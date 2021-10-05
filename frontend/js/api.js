/* Ensemble de fonctions permettant de requêter l'API */


/* Variables et constantes */
const URL_API = 'http://localhost:3000/api/teddies/';
const erreur = document.querySelector('.error');

/**
 * Permet de récupérer les teddies via l'API par la méthode GET et l'url :
 * http://localhost:3000/api/teddies/
 * @returns {Promise} teddies
 */
async function getAllTeddies() {
    try {
        //Récupération de la réponse de l'API après le GET
        const response = await fetch(URL_API);
        //transformation de la réponse en json
        let teddies = await response.json();
        //Retourne une "Promise"
        return teddies;
    } catch (error) {
        erreur.innerHTML = `L'erreur <strong> ${error.message} </strong> est survenue, nous essayons de la régler au plus vite !!! `;
    }
}


export { getAllTeddies };