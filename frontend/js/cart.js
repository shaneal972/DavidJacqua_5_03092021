import * as f from './form.js';
import { formattedPrice } from './utils.js';

function createProduct(product) {
    let cartElt = '';
    cartElt = `
        <li class="list-group-item d-flex justify-content-between product__item">
            <div class="d-flex">
                <img class="mr-3" src="${product.image}" alt="image d'une peluche" width="105" height="70">
                <p class="fs-6 infos__product mt-1 mb-0">
                    <span id="product-name" class="fw-bold">${product.name}</span> <br>
                    Prix : <span id="product-price">${product.price}</span> € <br>
                    <span id="product-color" class="infos__product--color">${product.color}</span>
                </p>
            </div>
            <div class="infos__product--qte mx-3 py-2">
                <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group-sm mr-2 d-none d-sm-block" role="group" aria-label="First group">
                    <button id="btn-moins" type="button" class="btn-cart btn-secondary">-</button>
                    </div>
                    <div class="input-group-sm product__qte--input">
                    <input id="input-qte" type="text" data-qty=${product.qty} class="form-control" value="${product.qty}">
                    </div>
                    <div class="btn-group-sm mr-2 d-none d-sm-block" role="group" aria-label="First group">
                        <button id="btn-plus" type="button" class="btn-cart btn-secondary">+</button>
                    </div>
                </div>
            </div>
            <div class="py-2 mx-2 info-product-price">
                <span id="cart-price">${formattedPrice(product.price)}</span><span class="d-none d-sm-inline"> €</span> 
            </div>
            <p class="py-2 product__delete" title="supprimer l'article">
            X
            </p>
        </li>`;
    
    return cartElt;
}

function renderCart(cle) {
    
    let html = '';

    let cart = JSON.parse(localStorage.getItem(cle));
    cart.forEach(product => {
        html += createProduct(product);
    });

    let ulElt = document.querySelector('.list-group');
    ulElt.innerHTML = html;

}

renderCart('panier');


window.onload = function () {

    function addColorToElt(namedColor, span) {
        // const span = document.querySelector("#product-color");
    
        if (namedColor == 'White') {
            span.classList.add('bg-dark');
        }

        if (namedColor == 'Beige') {
            span.classList.add('bg-dark-beige');
        }
    
        if (namedColor.includes(' ')) {
            namedColor = namedColor.replace(' ', '-').toLowerCase();
            span.classList.add(namedColor);
        } else {
            namedColor = namedColor.toLowerCase();
            span.classList.add(namedColor);
        }
    }

    function updateTotalOfProduct() {
        let nbProductInCart = 0;
        let priceTotalOfProducts = 0;
        let priceTotalOfCart = 0;
        let priceOfShip = 0;
        let priceInCart = 0;

        const shipPrice = document.querySelector('#ship-price');
        const plural = document.querySelector('#plural');
        const productInCart = document.querySelector('#product-in-cart');
        const total = document.querySelector('#prix-total-of-cart');
        const totalOfProduct = document.querySelector('#prix-total-of-product');
        const nbTotalProductInCart = document.querySelector('#nb-total-product-in-cart');
        const products = document.querySelectorAll('.product__item');
        const cartPrices = document.querySelectorAll('#cart-price');
        

        products.forEach(product => {
            let productQty = product.querySelector('#input-qte').value;
            let cartPrice = product.querySelector('#cart-price').innerText;

            if (productQty < 0 || productQty === NaN) {
                productQty = 1;
            }

            // if (productQty > 1) {
            //     cartPrices.forEach(priceCart => {
            //         priceInCart = parseFloat(priceCart.innerHTML) * Number(productQty);
            //         console.log(priceInCart);
            //     })
            //     cartPrice = priceInCart;
            // }
             
            nbProductInCart += Number(productQty);
            priceTotalOfProducts += parseFloat(cartPrice) * Number(productQty);
            
        });
        nbTotalProductInCart.innerHTML = nbProductInCart;
        productInCart.innerHTML = nbProductInCart;
        totalOfProduct.innerHTML = formattedPrice(priceTotalOfProducts);
        
        if (shipPrice.innerHTML === 'gratuit') {
            priceOfShip = 0 
        } else {
            priceOfShip = Number(shipPrice.innerHTML);
        }

        nbProductInCart > 1 ? plural.innerHTML = 's' : plural.innerHTML = '';

        priceTotalOfCart = parseFloat(totalOfProduct.innerHTML) + shipPrice;
        total.innerHTML = formattedPrice(priceTotalOfCart);
    }

    function deleteProduct(btn) {
        // const btnsDel = document.querySelectorAll('.product__delete');
        let productsInCart = JSON.parse(localStorage.getItem('panier'));

        let nameProduct = '';
        let colorProduct = '';

        let productElt = btn.closest('li');
        productElt.remove();
        updateTotalOfProduct();

        nameProduct = productElt.querySelector('#product-name').innerText;
        colorProduct = productElt.querySelector('#product-color').innerText;

        let deletedProducts = productsInCart.filter(function (product) {
            return product.name === nameProduct && product.color === colorProduct;
        });

        let indice = 0;
        indice = productsInCart.indexOf(deletedProducts[0]);

        productsInCart.splice(indice, 1);
        localStorage.setItem('panier', JSON.stringify(productsInCart));
        renderCart('panier');
        location.reload();
    }

    function deleteProductByInputChange(element) {
        // const btnsDel = document.querySelectorAll('.product__delete');
        let productsInCart = JSON.parse(localStorage.getItem('panier'));

        let nameProduct = '';
        let colorProduct = '';

        let productElt = element.closest('li');
        productElt.remove();
        updateTotalOfProduct();

        nameProduct = productElt.querySelector('#product-name').innerText;
        colorProduct = productElt.querySelector('#product-color').innerText;

        let deletedProducts = productsInCart.filter(function (product) {
            return product.name === nameProduct && product.color === colorProduct;
        });

        let indice = 0;
        indice = productsInCart.indexOf(deletedProducts[0]);

        productsInCart.splice(indice, 1);
        localStorage.setItem('panier', JSON.stringify(productsInCart));
        renderCart('panier');
        location.reload();
    }
    

    let spans = document.querySelectorAll("#product-color");
    let namedColor = '';

    for (let i = 0; i < spans.length; i++) {
        namedColor = spans[i].innerHTML;
        addColorToElt(namedColor, spans[i]);
    }

    //Suppression d'un element du panier
    const btnsDel = document.querySelectorAll('.product__delete');
    btnsDel.forEach(btn => {
        btn.addEventListener('click', function (event) {
            deleteProduct(btn);
        })
    });


    //Changement de la valeur du input d'un produit
    function changeInputValueOfProduct() {
        const plus = document.querySelectorAll('#btn-plus');
        const moins = document.querySelectorAll('#btn-moins');
        
        let inputs = document.querySelectorAll('#input-qte');
        const btnPlus = [];

        addEventListener('click', function (e) {
            plus.forEach(btn => {
                if (e.target === btn) {
                    let input = btn.closest('li').querySelector('#input-qte');
                    let qte = Number(input.value);
                    qte++;
                    input.value = qte;
                    updateTotalOfProduct();
                };
            });
            moins.forEach(btn => {
                if (e.target === btn) {
                    let input = btn.closest('li').querySelector('#input-qte');
                    let qte = Number(input.value);
                    qte--;
                    input.value = qte;
                    for (let i = 0; i < myProducts.length; i++){
                        myProducts[i].qty = qte;
                    }
                    if (qte === 0) {
                        deleteProductByInputChange(input)
                    }
                    updateTotalOfProduct();
                };
            });
        });
    }

    changeInputValueOfProduct();    
   
    updateTotalOfProduct();

    //Récupération des valeurs des entrées du formulaire
    let id = (id) => document.getElementById(id);
    let classes = (classes) => document.getElementsByClassName(classes);

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

        return valid;
    }

    let firstname = id('firstname'),
        lastname = id('lastname'),
        address = id('address'),
        city = id('city'),
        email = id('email'),
        btnCmd = id('btn-cmd'),
        errorMsg = classes("error");
    
    
    
    // for (let i = 0; i < errorMsg.length; i++){
    //     errorMsg[i].style.display = 'none';
    // }
    
    btnCmd.addEventListener('click', async (e) => {
        // e.preventDefault();

        let validFirst = validate(firstname, 0, "Le prénom ne doit pas être vide et doit être supérieur à 2 caractères");
        let validLast = validate(lastname, 1, "Le nom ne doit pas être vide et doit être supérieur à 2 caractères");
        let validAddr = validate(address, 2, "L'adresse ne doit pas être vide et doit être supérieur à 2 caractères");
        let validCity = validate(city, 3, "La ville ne doit pas être vide et doit être supérieur à 2 caractères");
        let validEmail = validate(email, 4, "L'email ne doit pas être vide et doit être supérieur à 2 caractères");

        let commande = {};

        if (
            validFirst === true &&
            validLast === true && 
            validAddr === true &&
            validCity === true &&
            validEmail === true
        ) {
            //On crée l'objet contact 😅 
            let contact = {
                firstName: firstname.value,
                lastName: lastname.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }
            
            //On récupère le tableau d'id du panier 🛍  
            let products = [];
            let produits = JSON.parse(localStorage.getItem('panier'));

            //On met les id du panier dans le tableau products
            produits.forEach(p => {
                products.push(p.id);
            })
            
            
            //Envoi des informations du client et du panier au serveur en méthode POST
            const postCommand = async () => {
                try {
                    const urlPost = 'http://localhost:3000/api/teddies/order';
                    const response = await fetch(urlPost, {
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
                    console.log(commande);
                    location.href = "./commande.html";
                } catch(error) {
                    console.log(error);
                } 
            }
            
            postCommand();
                        
        } 
        
    });
};