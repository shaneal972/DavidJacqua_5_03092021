const URL_API = 'http://localhost:3000/api/teddies/';

//Récupération de l'élément ayant la classe error 
let erreur = document.querySelector('.error');

/**
 * Récupère tous les teddies de l'api via l'url : http://localhost:3000/api/teddies
 * @returns {Promise}
 */
 async function getTeddies() {
    
    try {
        //Récupératin de la réponse de l'API 
        const response = await fetch(URL_API);
        //transformation en json
        let teddies = await response.json();

        return teddies;
    } catch (error) {
        erreur.innerHTML = `L'erreur <strong> ${error.message} </strong> est survenue, nous essayons de la régler au plus vite !!! `;
    }
    
}

/**
 * Récupère un teddies en fonction de son id, via l'url : 
 * http://localhost:3000/api/teddies/{_id}
 * @returns {Promise}
 */
async function getOneTeddie() {

    //Récupération du paramètre id dans l'url
    let params = new URLSearchParams(document.location.search.substring(1));
    let _id = params.get("id");

    try {
        //Récupératin de la réponse de l'API 
        const response = await fetch(URL_API + `${_id}`);
        //Transformation de la réponse en format json
        return await response.json();
    } catch (error) {
        //Affichage de l'erreur dans l'élément ayant la classe error dan snotre HTML
        erreur.innerHTML = `Une erreur est survenue ${error} : , nous essayons de la régler au plus vite !!!`;
    }

}

/**
 * Permet d'envoyer une commande au serveur en POST via l'url : 
 * http://localhost:3000/api/teddies/order
 * @param {Object} contact 
 * @param {Array} products 
 */
async function postCommand(contact, products) {
    try {
        const response = await fetch(URL_API + 'order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        localStorage.setItem('commande', JSON.stringify(commande));
        location.href = "./commande.html";
    } catch (error) {
        erreur.innerHTML = `Une erreur est survenue ${error} : , nous essayons de la régler au plus vite !!!`;
    }
}

export { getTeddies, getOneTeddie, postCommand };