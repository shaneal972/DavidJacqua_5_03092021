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

/**
 * Permet de récupérer un teddie en fonction de son id, via l'API en GET sur l'url:
 * http://localhost:3000/api/teddies/{_id}
 * @param {String} _id 
 * @returns {Promise} teddie un objet teddie
 */
async function getOneTeddie(_id) {
    try {
        const response = await fetch(URL_API + `${_id}`);

        const data = await response.json();
        return data;
    } catch (error) {
        erreur.innerHTML = `L'erreur <strong> ${error.message} </strong> est survenue, nous essayons de la régler au plus vite !!! `;
    }
}


export { getAllTeddies, getOneTeddie };