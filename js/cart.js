let cart = []


function addBookToCart(title, price, img) {

  let bookObject = {
    name: title,
    amount: price,
    picture: img
  }

  cart.push(bookObject)

  let htmlArray = cart.map(({
    name, amount, picture
  }) => /*html*/`
    <div class="cartItem">
    <p> Title: ${name}</p>
    <p> Price: ${amount}</p>
    <img class="bookImageCart img-fluid" src="${picture}" alt="Responsive image">
    
    <hr class="line">
    </div>
  `);
  document.querySelector('.itemInCart').innerHTML = htmlArray.join('');


}