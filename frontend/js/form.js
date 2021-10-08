/* Ensemble de fonctions permettant de tester, valider le formulaire */


/**
 * Permet de récupérer un élément par son id
 * @param {HTMLElement} id 
 * @returns {Element}
 */
 let id = (id) => document.getElementById(id);

 /**
  * Permet de récupérer un élément par le nom d'une classe
  * @param {*} classes 
  * @returns {Element}
  */
 let classes = (classes) => document.getElementsByClassName(classes);

let errorMsg = classes("error");

/**
 * Permet de valider un input dans un formulaire
 * @param {HTMLInputElement} id 
 * @param {Number} serial 
 * @param {String} message Le message à afficher si erreur
 * @returns {Boolean} valid
 */
let validate = (id, serial, message) => {
    let valid;
    if (id.value.trim() === "" || id.value.trim().length < 2) {
        errorMsg[serial].style.display = "block";
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid red";
        valid = false;
    } else {
        errorMsg[serial].innerHTML = "";
        id.style.border = "2px solid green";
        errorMsg[serial].style.display = "none";
        valid = true;
    }

    if (id.getAttribute('type') === 'email') {
        let validRegex;
        if (id.value.trim() !== "" || id.value.trim().length > 2) {

            errorMsg[serial].innerHTML = '';
            
            validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            // On vérifie que l'email entré vérifie la Regex de validation de mails.
            if (id.value.match(validRegex)) {
                errorMsg[serial].innerHTML = "";
                id.style.border = "2px solid green";
                errorMsg[serial].style.display = "none";
                valid = true;
            } else {
                errorMsg[serial].style.display = "block";
                errorMsg[serial].innerHTML = "Votre email n'est pas un email valid, merci de le retaper";
                id.style.border = "2px solid red";
                valid = false;
            }
        }
    }

    if ((id.getAttribute('id') === 'firstname') || (id.getAttribute('id') === 'lastname')) {
       
        // On vérifie que la valeur entrée vérifie la Regex de validation.
        if (id.value.match(/^[a-zà-ï-]+$/gi)) {
            errorMsg[serial].innerHTML = "";
            id.style.border = "2px solid green";
            errorMsg[serial].style.display = "none";
            valid = true;
        } else {
            errorMsg[serial].style.display = "block";
            errorMsg[serial].innerHTML = "Ce champ ne doit pas contenir de nombre, merci de le retaper";
            id.style.border = "2px solid red";
            valid = false;
        }
    }
    return valid;
}

export { validate, id, classes };