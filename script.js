let books;

const dropdown1 = document.getElementById("book-select1");
const dropdown2 = document.getElementById("book-select2");
const dropdown3 = document.getElementById("book-select3");
const dropdowns = [dropdown1, dropdown2, dropdown3];

const ddselect = document.getElementsByClassName("dd-select");
const ref1 = document.getElementById("book-ref1");
const ref2 = document.getElementById("book-ref2");
const ref3 = document.getElementById("book-ref3");
const refs = [ref1, ref2, ref3];

const qty1 = document.getElementById("book-qty1");
const qty2 = document.getElementById("book-qty2");
const qty3 = document.getElementById("book-qty3");
const qties = [qty1, qty2, qty3];

const uprice1 = document.getElementById("book-uprice1");
const uprice2 = document.getElementById("book-uprice2");
const uprice3 = document.getElementById("book-uprice3");
const uprices = [uprice1, uprice2, uprice3];

const price1 = document.getElementById("book-price1");
const price2 = document.getElementById("book-price2");
const price3 = document.getElementById("book-price3");
const prices = [price1, price2, price3];

const totalPrice = document.getElementById("books-total");

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
  let totalPriceValue = 0;
  let totalPriceValue1 = 0;
  let totalPriceValue2 = 0;
  let totalPriceValue3 = 0;
  for (let qty of qties) {
    qty.addEventListener("keyup", (e) => {
      if (
        qties.indexOf(qty) == 0 &&
        ref1.value != null &&
        qty1.value.match(/^$|[0-9]/)
      ) {
        price1.value = e.target.value * uprice1.value;
        totalPriceValue1 = parseInt(price1.value, 10);
      } else if (
        qties.indexOf(qty) == 1 &&
        ref2.value != null &&
        qty2.value.match(/^$|[0-9]/)
      ) {
        price2.value = e.target.value * uprice2.value;
        totalPriceValue2 = parseInt(price2.value, 10);
      } else if (
        qties.indexOf(qty) == 2 &&
        ref3.value != null &&
        qty3.value.match(/^$|[0-9]/)
      ) {
        price3.value = e.target.value * uprice3.value;
        totalPriceValue3 = parseInt(price3.value, 10);
      }
      totalPriceValue = totalPriceValue1 + totalPriceValue2 + totalPriceValue3;
      totalPrice.value = totalPriceValue + " €";
    });
  }
}

init();
initDropdown();
addDropdownListener();
calculatePrices();
