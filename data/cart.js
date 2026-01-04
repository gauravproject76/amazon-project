export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id) {
  let matchingItem;
  const quantity = Number(document.querySelector(`.js-product-quantity-${id}`).value);

  cart.forEach((items) => {
      if (id === items.id) {
          matchingItem = items;
      }
  });

  if (matchingItem) {
      matchingItem.quantity += quantity;
  }else{
      cart.push({
          id: id,
          quantity: quantity,
          deliveryOptionsId: '1'
      })
  }

  saveToStorage();
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartitem) => {
        if (productId !== cartitem.id) {
            newCart.push(cartitem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((items) => {
      cartQuantity += items.quantity;
  })

  return cartQuantity;
};

export function updateQuantity(id, newQuantity) {
    cart.forEach((items) => {
        if (id === items.id) {
            items.quantity = newQuantity;
            saveToStorage();
        }
    })
}

export function updateDeliveryOption(id, deliveryOptionId) {
    let matchingItem;
    cart.forEach((items) => {
        if (id === items.id) {
            matchingItem = items;
        }
    });

    matchingItem.deliveryOptionsId = deliveryOptionId;

    saveToStorage();
}