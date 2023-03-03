let cart = []
let count = 0


function addCount(title) {
  debugger
  console.log(cart)
  findObject = cart.filter(function (entry) { return entry.name === title })
  findObject[0].bookAmount++
  console.log("Hello " + findObject[0].bookAmount)

}


function addBookToCart(title, price, img) {
  debugger

  let bookObject = {
    name: title,
    amount: price,
    picture: img,
    bookAmount: count
  }

  if (cart.some(book => book.name === title)) {
    addCount(title)
  } else {
    cart.push(bookObject)
    addCount(title)
  }



  let htmlArray = cart.map(({
    name, amount, picture, bookAmount
  }) => /*html*/`
    <div class="cartItem">
    <p> Title: ${name}</p>
    <p> Price: ${amount}</p>
    <p> Count: ${bookAmount}</p>
    <img class="bookImageCart img-fluid" src="${picture}" alt="Responsive image">
    <hr class="line">
    </div>
  `);
  document.querySelector('.itemInCart').innerHTML = htmlArray.join('');


}