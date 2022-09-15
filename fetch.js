/*
Un essai pour charger un JSON dans des <select> avec la méthode fetch
*/

const url = "books.json";
let books;

const dropdowns = document.querySelectorAll(".dd-select");
const refs = document.querySelectorAll(".ref-input");
const qties = document.querySelectorAll(".qty-input");
const uprices = document.querySelectorAll(".uprice-input");
const prices = document.querySelectorAll(".price-input");
const totalPrice = document.querySelector("#books-total");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(url)
  .then((response) => response.json())
  .then(initDropdown)
  .then(addDropdownListener)
  .then(addQtyListener)
  .catch((error) => console.log(error));

function initDropdown(data) {
  books = data;
  return books.map(function (book) {
    dropdowns.forEach((dropdown) => {
      let option = createNode("option");
      option.text = book.lib;
      option.value = book.ref;
      append(dropdown, option);
    });
  });
}

// Ajoute un listener pour chaque dropdown
function addDropdownListener() {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", findDropdown, false);
  });
}

// Renvoie les infos d'index à showDetails pour chaque dropdown
function findDropdown(e) {
  let ref;
  let uprice;

  switch (e.target.id) {
    case "book-select1":
      ref = refs[0];
      uprice = uprices[0];
      break;
    case "book-select2":
      ref = refs[1];
      uprice = uprices[1];
      break;
    case "book-select3":
      ref = refs[2];
      uprice = uprices[2];
      break;
    default:
      console.log("rien trouvé");
  }

  showDetails(ref, uprice, e.target.value);
}

// Affiche détails du livre depuis la sélection dans le dropdown
function showDetails(indexRef, indexUprice, id) {
  for (let book of books) {
    if (book.ref === id) {
      indexRef.value = book.ref;
      indexUprice.value = book.uprice;
    }
  }
}

// Met à jour le prix total par ligne avec les quantités et le total global
function addQtyListener() {
  let totalPriceValue1 = 0;
  let totalPriceValue2 = 0;
  let totalPriceValue3 = 0;

  qties.forEach((qty) => {
    qty.addEventListener("keyup", (e) => {
      if (
        e.target.id === "book-qty1" &&
        refs[0].value != null &&
        qties[0].value.match(/^$|[0-9]/) //Number.isInteger(qty1.value)
      ) {
        prices[0].value = e.target.value * uprices[0].value;
        totalPriceValue1 = parseInt(prices[0].value, 10);
      } else if (
        e.target.id === "book-qty2" &&
        refs[1].value != null &&
        qties[1].value.match(/^$|[0-9]/)
      ) {
        prices[1].value = e.target.value * uprices[1].value;
        totalPriceValue2 = parseInt(prices[1].value, 10);
      } else if (
        e.target.id === "book-qty3" &&
        refs[2].value != null &&
        qties[2].value.match(/^$|[0-9]/)
      ) {
        prices[2].value = e.target.value * uprices[2].value;
        totalPriceValue3 = parseInt(prices[2].value, 10);
      }
      let totalPriceValue =
        totalPriceValue1 + totalPriceValue2 + totalPriceValue3;
      totalPrice.value = totalPriceValue + " €";
    });
  });
}
