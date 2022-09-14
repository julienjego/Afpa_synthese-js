let books;

const dropdowns = document.querySelectorAll(".dd-select");

const ref1 = document.getElementById("book-ref1");
const ref2 = document.getElementById("book-ref2");
const ref3 = document.getElementById("book-ref3");

const qty1 = document.getElementById("book-qty1");
const qty2 = document.getElementById("book-qty2");
const qty3 = document.getElementById("book-qty3");
const qties = document.querySelectorAll(".qty-input");

const uprice1 = document.getElementById("book-uprice1");
const uprice2 = document.getElementById("book-uprice2");
const uprice3 = document.getElementById("book-uprice3");

const price1 = document.getElementById("book-price1");
const price2 = document.getElementById("book-price2");
const price3 = document.getElementById("book-price3");

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
  dropdowns.forEach((dropdown) => {
    for (let book of books) {
      option = document.createElement("option");
      option.text = book.lib;
      option.value = book.ref;
      dropdown.add(option);
    }
  });
}

// Ajoute un listener pour chaque dropdown
export function addDropdownListener() {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", findDropdown, false);
  });
}

// Renvoie les infos d'index à showDetails pour chaque dropdown
export function findDropdown(e) {
  let ref;
  let uprice;

  switch (e.target.id) {
    case "book-select1":
      ref = ref1;
      uprice = uprice1;
      break;
    case "book-select2":
      ref = ref2;
      uprice = uprice2;
      break;
    case "book-select3":
      ref = ref3;
      uprice = uprice3;
      break;
    default:
      console.log("rien trouvé");
  }

  showDetails(ref, uprice, e.target.value);
}

// Affiche détails du livre depuis la sélection dans le dropdown
export function showDetails(indexRef, indexUprice, id) {
  for (let book of books) {
    if (book.ref == id) {
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
        e.target.id == "book-qty1" &&
        ref1.value != null &&
        qty1.value.match(/^$|[0-9]/) //Number.isInteger(qty1.value)
      ) {
        price1.value = e.target.value * uprice1.value;
        totalPriceValue1 = parseInt(price1.value, 10);
      } else if (
        e.target.id == "book-qty2" &&
        ref2.value != null &&
        qty2.value.match(/^$|[0-9]/)
      ) {
        price2.value = e.target.value * uprice2.value;
        totalPriceValue2 = parseInt(price2.value, 10);
      } else if (
        e.target.id == "book-qty3" &&
        ref3.value != null &&
        qty3.value.match(/^$|[0-9]/)
      ) {
        price3.value = e.target.value * uprice3.value;
        totalPriceValue3 = parseInt(price3.value, 10);
      }
      let totalPriceValue =
        totalPriceValue1 + totalPriceValue2 + totalPriceValue3;
      totalPrice.value = totalPriceValue + " €";
    });
  });
}

export function choubidou() {
  console.log("dingo");
}

// init();
// initDropdown();
// addDropdownListener();
// addQtyListener();
