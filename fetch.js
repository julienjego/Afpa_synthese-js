/*
Un essai pour charger un JSON dans des <select> avec la méthode fetch
*/

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const dropdown1 = document.getElementById("book-select1");
const dropdown2 = document.getElementById("book-select2");
const dropdown3 = document.getElementById("book-select3");
const dropdowns1 = [dropdown1, dropdown2, dropdown3];
const dropdowns = document.getElementsByClassName("dd-select");
console.log(dropdowns1);
console.log(dropdowns);
const url = "books.json";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let books = data;
    return books.map(function (book) {
      for (let dropdown of dropdowns) {
        let option = createNode("option");
        option.text = book.lib;
        option.value = book.ref;
        append(dropdown, option);
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });
