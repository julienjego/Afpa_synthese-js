let books;

let dropdown1 = document.getElementById("book-select1");
let dropdown2 = document.getElementById("book-select2");
let dropdown3 = document.getElementById("book-select3");
let dropdowns = [dropdown1, dropdown2, dropdown3];
let ddselect = document.getElementsByClassName("dd-select");

let ref1 = document.getElementById("book-ref1");
let ref2 = document.getElementById("book-ref2");
let ref3 = document.getElementById("book-ref3");
let refs = [ref1, ref2, ref3];

let qty1 = document.getElementById("book-qty1");
let qty2 = document.getElementById("book-qty2");
let qty3 = document.getElementById("book-qty3");
let qties = [qty1, qty2, qty3];

let uprice1 = document.getElementById("book-uprice1");
let uprice2 = document.getElementById("book-uprice2");
let uprice3 = document.getElementById("book-uprice3");
let uprices = [uprice1, uprice2, uprice3];

let price1 = document.getElementById("book-price1");
let price2 = document.getElementById("book-price2");
let price3 = document.getElementById("book-price3");
let prices = [price1, price2, price3];

let totalPrice = document.getElementById("books-total");

let totalPriceValue = 0;

// Fonction pour charger le JSON
function loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "books.json", false); // En synchrone et pas asynchrone
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Fonction pour parser le JSON
function init() {
  loadJSON(function (response) {
    // Parse JSON string into object
    books = JSON.parse(response);
    console.log(books);
  });
}

// On initialise les dropdown menus avec ce que l'on a récupéré du JSON
function initDropdown() {
  let option;
  for (let dropdown of dropdowns) {
    for (let book of books) {
      option = document.createElement("option");
      option.text = book.lib;
      option.value = book.ref;
      dropdown.add(option);
    }
  }
}

// Ajoute un listener pour chaque dropdown et envoie les infos d'index à showDetails
function addDropdownListener() {
  for (let dropdown of dropdowns) {
    dropdown.addEventListener("change", (e) => {
      if (dropdowns.indexOf(dropdown) == 0) {
        showDetails(ref1, uprice1, e.target.value);
      } else if (dropdowns.indexOf(dropdown) == 1) {
        showDetails(ref2, uprice2, e.target.value);
      } else if (dropdowns.indexOf(dropdown) == 2) {
        showDetails(ref3, uprice3, e.target.value);
      }
      console.log(e.target.value);
    });
  }
}

// Affiche détails du livre depuis la sélection dans le dropdown
function showDetails(indexRef, indexUprice, id) {
  for (let book of books) {
    if (book.ref == id) {
      indexRef.value = book.ref;
      indexUprice.value = book.uprice;
    }
  }
}

// Met à jour le prix total par ligne avec les quantités et le total global
function calculatePrices() {
  for (let qty of qties) {
    qty.addEventListener("keyup", (e) => {
      if (qties.indexOf(qty) == 0 && ref1.value != null) {
        price1.value = e.target.value * uprice1.value;
        totalPriceValue += parseInt(price1.value, 10);
        totalPrice.value = totalPriceValue;
        console.log(typeof totalPriceValue);
      } else if (qties.indexOf(qty) == 1 && ref2.value != null) {
        price2.value = e.target.value * uprice2.value;
        totalPriceValue += parseInt(price2.value, 10);
        totalPrice.value = totalPriceValue;
      } else if (qties.indexOf(qty) == 2 && ref3.value != null) {
        price3.value = e.target.value * uprice3.value;
        totalPriceValue += parseInt(price3.value, 10);
        totalPrice.value = totalPriceValue;
      }
    });
  }
}

init();
initDropdown();
addDropdownListener();
calculatePrices();
