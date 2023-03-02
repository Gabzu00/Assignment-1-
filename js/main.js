import '../css/style.css';
import { getJSON } from './utils/getJSON';

let books;

async function start() {
  books = await getJSON('/json/books.json')
  initPage();
  homePage();
  bookPage();
}

function initPage() {
  const homeElement = document.querySelector(".mainPage");
  homeElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark "> Hello and welcome to the bookstore</p>
      <img class="BookIcon img-fluid" alt="Responsive image" src="/Images/BookIcon.jpg">
    `;
}
function homePage() {
  document.querySelector("#homeButton").onclick = function () {
    const homeElement = document.querySelector(".mainPage");
    homeElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark "> Hello and welcome to the bookstore</p>
      <img class="BookIcon img-fluid" alt="Responsive image" src="/Images/BookIcon.jpg">
    `;
    const bookElement = document.querySelector(".bookPage");
    bookElement.innerHTML = ``;
  }
}


function filterByAuthor() {
  const bookElement = document.querySelector(".bookPage");
  bookElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark"> These are the books available</p>
      <p class="priceRange text-center text-dark"> Select a author</p>
      <form class="form-inline">
        <input class="form-control mr-sm-2 bg-white" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0 bg-white" type="submit">Search</button>
      </form>
    <div class="priceFilter"></div>
  `;
}

function filterByPrice() {
  const bookElement = document.querySelector(".priceFilter");
  bookElement.innerHTML = /*html*/`
    
    <p class="priceRange">Select a price range</p>
    <div class="fix">
    <input class="form-control mr-sm-2 bg-white " type="search" placeholder="min" aria-label="Search">
    <input class="form-control mr-sm-2 bg-white" type="search" placeholder="max" aria-label="Search">
    </div>

    <div class="addFilter"></div>
  `;
}

function filterByCategori() {
  const bookElement = document.querySelector(".addFilter");
  bookElement.innerHTML = /*html*/`
      <div class="categoriFilter">
      <label><span>Filter by categories:</span>
      <select>
        <option>All</option>
        <option>UX</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>JavaScript</option>
      </select>
    </label>
    </div>
    <div class="addSorting"></div>
    `;

}

function sortingOptions() {
  const bookElement = document.querySelector(".addSorting");
  bookElement.innerHTML = /*html*/`
      <div class="sorting">
      <label><span>Sorting options:</span>
      <select>
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
}

function bookPage() {
  document.querySelector("#bookButton").onclick = function () {
    const homeElement = document.querySelector(".mainPage");
    homeElement.innerHTML = ``;
    filterByAuthor();
    filterByPrice();
    filterByCategori();
    sortingOptions();

    let htmlArray = books.map(({
      title, author, category, price
    }) => /*html*/`
    <div class="book">
      <p><span>Title</span>${title}</p>
      <p><span>Author</span>${author}</p>
      <p><span>Price</span>${price}</p>
      <p><span>Category</span>${category}</p>
      <button class="detaildButton btn-lg">Details</button>
      <button class="cart btn-lg">Add to cart</button>
    </div>
    `);
    document.querySelector('.displayBook').innerHTML = htmlArray.join('');


  }

}


start();