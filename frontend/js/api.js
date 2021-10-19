/* Ensemble de fonctions permettant de requêter l'API */


/* Variables et constantes */
const URL_API = 'http://localhost:3000/api/teddies/';
let erreur = document.querySelector('.error');
let commande = {};


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
        erreur.style.display = 'block';
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
        erreur.style.display = 'block';
    }
}

/**
 * Permet d'envoyer une requête à l'API en POST 
 * @param {Object} contact Informations sur l'acheteur
 * @param {Array} products Tableau des id du panier
 */
const postCommand = async (contact, products) => {
    
    try {
        
        const urlPost = URL_API + 'order';
        const response = await fetch(urlPost, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contact: contact,
                products: products
            })
        });
        const data = await response.json();
        //Retourne les informations du serveur après le post
        commande = {
            'contact': data.contact,
            'orderId': data.orderId,
            'products': data.products
        };
        // localStorage.setItem('commande', JSON.stringify(commande));
        return commande;
    } catch (error) {
        erreur.innerHTML = error;
        erreur.style.display = 'block';
    }
    // Stocke le retour du serveur dans le Storage
}


export { getAllTeddies, getOneTeddie, postCommand };