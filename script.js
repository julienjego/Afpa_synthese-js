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

function init() {
  loadJSON(function (response) {
    // Parse JSON string into object
    books = JSON.parse(response);
  });
}

function initDropdown() {
  init();
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

initDropdown();

function showRef() {
  init();
  let value = ddselect.value;
  let text = ddselect.options[ddselect.selectedIndex].text;
  console.log(value, text);
}
ddselect.onchange = showRef;
showRef();
