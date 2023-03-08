import '../css/style.css';
import { getJSON } from './utils/getJSON';

let books,
  chosenCategoryFilter = 'all',
  go = 0,
  min,
  max,
  selectedAuthor,
  chosenSortOption = 'Title ascending';

async function start() {
  books = await getJSON('/json/books.json')
  something();
  if (go == 1) {
    filterByAuthor();
    filterByPrice();
    filterByCategori();
    sortingOptions();
    bookPage();

  }

}

var something = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      // do something
      const homeElement = document.querySelector(".mainPage");
      homeElement.innerHTML = /*html*/`
        <p class="FirstPageTitle text-center text-dark "> Hello and welcome to the bookstore</p>
        <img class="BookIcon img-fluid" alt="Responsive image" src="/Images/BookIcon.jpg">
      `;

      const bookElement = document.querySelector(".bookPage");
      bookElement.innerHTML = ``;
    }
  };
})();


document.querySelector("#homeButton").onclick = function () {
  const homeElement = document.querySelector(".mainPage");
  homeElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark "> Hello and welcome to the bookstore</p>
      <img class="BookIcon img-fluid" alt="Responsive image" src="/Images/BookIcon.jpg">
    `;
  const bookElement = document.querySelector(".bookPage");
  bookElement.innerHTML = ``;
}


function filterByAuthor() {
  const bookElement = document.querySelector(".bookPage");
  bookElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark"> These are the books available</p>
      <p class="priceRange text-center text-dark"> Select a author</p>
      <form class="form-inline">
        <input class="form-control mr-sm-2 bg-white" type="search" placeholder="Author" aria-label="Search" id="authorID">
        <button class="btn btn-outline-success my-2 my-sm-0 btn-success" type="submit" id="searchAuthor">Search</button>
      </form>
    <div class="priceFilter"></div>
  `;

  document.getElementById("searchAuthor").addEventListener("click", function () {

    getAuthor();
    bookPage();
  });
}

function getAuthor() {
  debugger
  if (document.getElementById("authorID").value === '') {
    selectedAuthor = '';
  } else {
    selectedAuthor = document.getElementById("authorID").value;
  }
}

function filterByPrice() {
  const bookElement = document.querySelector(".priceFilter");
  bookElement.innerHTML = /*html*/`
    <p class="priceRange">Select a price range</p>
    <div class="fix">
      <input class="form-control mr-sm-2 bg-white" type="search" placeholder="min" aria-label="Search" id="min">
      <input class="form-control mr-sm-2 bg-white" type="search" placeholder="max" aria-label="Search" id="max">
      <button class="btn btn-outline-success my-2 my-sm-0 btn-success" type="submit" id="searchBtn">Search</button>
    </div>
    <div class="addFilter"></div>
  `;

  // add event listener to search button
  document.getElementById("searchBtn").addEventListener("click", function () {
    getData();
    bookPage();
  });
}

function getData() {
  debugger
  min = document.getElementById("min").value;
  max = document.getElementById("max").value;

}

function filterByCategori() {
  const bookElement = document.querySelector(".addFilter");
  bookElement.innerHTML = /*html*/`
      <div class="categoriFilter">
      <label><span>Filter by categories:</span>
      <select class="option">
        <option>all</option>
        <option>UX</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>Javascript</option>
      </select>
    </label>
    </div>
    <div class="addSorting"></div>
  `;

  // Add event listener to update chosenCategoryFilter
  const selectElement = document.querySelector('.option');
  selectElement.addEventListener('change', function () {
    chosenCategoryFilter = selectElement.value;
    bookPage(); // Re-render the book page with the updated filter
  });
}

function sortingOptions() {
  const bookElement = document.querySelector(".addSorting");
  bookElement.innerHTML = /*html*/`
      <div class="sorting">
      <label><span>Sorting options:</span>
      <select class="sortOption">
        <option>Title ascending</option>
        <option>Title decending</option>
        <option>Price ascending</option>
        <option>Price decending</option>
        <option>Author ascending</option>
        <option>Author decending</option>
      </select>
    </label>
    </div>
    <div class="displayBook"></div>
    `;
  const selectElement = document.querySelector('.sortOption');
  selectElement.addEventListener('change', function () {
    chosenSortOption = selectElement.value;
    bookPage(); // Re-render the book page with the updated filter
  });
}

function sortByTitleAcending(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1);
}

function sortByTitleDecending(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle < bTitle ? 1 : -1);
}

function sortByPriceAcending(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1);
}

function sortByPriceDecending(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice < bPrice ? 1 : -1);
}

function sortByAuthorAcending(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

function sortByAuthorDecending(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}

document.querySelector("#bookButton").onclick = function () {
  if (go == 0) {
    go++;
  }
  start();
}

function bookPage() {
  const homeElement = document.querySelector(".mainPage");
  homeElement.innerHTML = ``;

  console.log(chosenCategoryFilter)

  let filteredBooks = books.filter(
    ({ category, price, author }) =>
      (chosenCategoryFilter === 'all' || chosenCategoryFilter === category) &&
      ((min === undefined || min === '' || isNaN(min)) || price >= min) &&
      ((max === undefined || max === '' || isNaN(max)) || price <= max) &&
      (author === selectedAuthor || selectedAuthor === undefined || selectedAuthor === '')
  );

  console.log(min + " hello " + max)

  if (chosenSortOption === 'Title ascending') { sortByTitleAcending(filteredBooks) }
  if (chosenSortOption === 'Title decending') { sortByTitleDecending(filteredBooks) }
  if (chosenSortOption === 'Price ascending') { sortByPriceAcending(filteredBooks) }
  if (chosenSortOption === 'Price decending') { sortByPriceDecending(filteredBooks) }
  if (chosenSortOption === 'Author ascending') { sortByAuthorAcending(filteredBooks) }
  if (chosenSortOption === 'Author decending') { sortByAuthorDecending(filteredBooks) }
  let htmlArray = filteredBooks.map(({
    title, author, category, price, description, img
  }) => /*html*/`
    <div class="book">
      <p><span>Title</span>${title}</p>
      <p><span>Author</span>${author}</p>
      <p><span>Price</span>${price}</p>
      <p><span>Category</span>${category}</p>
      <button class="detaildButton btn-lg btn-primary" onclick="showModal('${description}','${title}', '${img}', '${price}');">Details</button>
      <button class="cart btn-lg btn-success" id="addBook" onclick="addBookToCart('${title}', '${price}', '${img}');">Buy book</button>
      
    </div>
    `);
  document.querySelector('.displayBook').innerHTML = htmlArray.join('');
};



start();