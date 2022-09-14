/*
Un essai pour charger un JSON dans des <select> avec la méthode fetch
*/

const dropdowns = document.querySelectorAll(".dd-select");
const url = "books.json";
let books;

import * as MyFn from "./script.js";
// const addDropdownListener = require("script.js");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    books = data;
    console.log(books);
    return books.map(function (book) {
      dropdowns.forEach((dropdown) => {
        let option = createNode("option");
        option.text = book.lib;
        option.value = book.ref;
        append(dropdown, option);
      });
    });
  })
  .catch(function (error) {
    console.log(error);
  });

MyFn.addDropdownListener();

//console.log(books);
