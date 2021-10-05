/**
 * Validation de prénom de l'utilisateur 
 * @param {string} firstname 
 * @returns {boolean} valid 
 */
function validateFirstname(firstname) {
    let valid;

    valid = firstname.length >= 2;

    valid = firstname !== '';

    return valid;
}

/**
 * Validation du nom de l'utilisateur 
 * @param {string} lastname 
 * @returns {boolean} valid 
 */
function validateLastname(lastname) {
    let valid = false;
    if (lastname.length < 2) {
        return valid;
    }

    if (lastname === '') {
        return valid
    }

    return !valid;
}

/**
 * Validation de l'adresse de l'utilisateur
 * @param {string} address 
 * @returns {boolean} valid
 */
function validateAddress(address) {
    let valid = false;
    if (address.length < 2) {
        return valid;
    }

    if (address === '') {
        return valid
    }

    return !valid;
}


/**
 * Validation de la ville de l'utilisateur
 * @param {string} city 
 * @returns {boolean} valid
 */
function validateCity(city) {
    let valid = false;
    if (city.length < 2) {
        return valid;
    }

    if (city === '') {
        return valid
    }

    return !valid;
}

/**
 * Validation de la ville de l'utilisateur
 * @param {string} email 
 * @returns {boolean} valid
 */
function validateEmail(email) {
    let valid = false;
    if (email.length < 2) {
        return valid;
    }

    if (email === '') {
        return valid
    }

    return !valid;
}

function validateForm(firstname, lastname, address, city, email) {
    let valid = false;
    if (validateFirstname(firstname)
        && validateLastname(lastname)
        && validateAddress(address)
        && validateCity(city)
        && validateEmail(email)
    ) {
        return !valid;
    } else {
        return valid;
    }
}



export {
    validateForm,
    validateEmail,
    validateCity,
    validateAddress,
    validateLastname,
    validateFirstname    
};