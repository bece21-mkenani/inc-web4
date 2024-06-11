// Get references to the HTML elements
const itemsList = document.querySelector('.items ul');
const addToBasketButtons = document.querySelectorAll('.add-to-basket');
const basketList = document.querySelector('#basket-items');
const checkoutButton = document.querySelector('#checkout');
const basketTotal = document.querySelector('#basket-total');

// Initialize the basket array
let basket = [];

// Function to add an item to the basket
function addToBasket(name, price) {
  // Check if the item is already in the basket
  const existingItem = basket.find(item => item.name === name);
  if (existingItem) {
    // If the item already exists in the basket, increment the quantity
    existingItem.quantity++;
  } else {
    // If the item does not exist in the basket, add it with a quantity of 1
    basket.push({
      name,
      price,
      quantity: 1
    });
  }
  // Update the basket display and total price
  updateBasket();
}

// Function to remove an item from the basket
function removeFromBasket(name) {
  // Find the item in the basket and remove it
  const index = basket.findIndex(item => item.name === name);
  basket.splice(index, 1);
  // Update the basket display and total price
  updateBasket();
}

// Function to update the basket display and total price
function updateBasket() {
  // Clear the current basket display
  basketList.innerHTML = '';
  // Add each item in the basket to the display
  basket.forEach(item => {
    const listItem = document.createElement('li');
    const name = document.createElement('span');
    const quantity = document.createElement('span');
    const price = document.createElement('span');
    const removeButton = document.createElement('button');
    name.textContent = item.name;
    quantity.textContent = `x${item.quantity}`;
    price.textContent = `$${item.price * item.quantity}`;
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromBasket(item.name));
    listItem.appendChild(name);
    listItem.appendChild(quantity);
    listItem.appendChild(price);
    listItem.appendChild(removeButton);
    basketList.appendChild(listItem);
  });
  // Update the total price display
  const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);
  basketTotal.textContent = `$${totalPrice}`;
}

// Event listener for adding items to the basket
addToBasketButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    addToBasket(name, price);
  });
});

// Event listener for checking out
checkoutButton.addEventListener('click', () => {
  alert(`Thank you for your purchase!\nTotal: ${basketTotal.textContent}`);
  // Clear the basket and update the display
  basket = [];
  updateBasket();
});
