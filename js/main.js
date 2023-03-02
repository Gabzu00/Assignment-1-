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

function bookPage() {
  document.querySelector("#bookButton").onclick = function () {
    const bookElement = document.querySelector(".bookPage");
    bookElement.innerHTML = /*html*/`
      <p class="FirstPageTitle text-center text-dark"> These are the books available</p>
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
    <div class="displayBook"></div>

    `;
    const homeElement = document.querySelector(".mainPage");
    homeElement.innerHTML = ``;

    let htmlArray = books.map(({
      id, title, author, category, price, img
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