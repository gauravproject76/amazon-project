import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';

function renderItems() {

  let productHTML = '';

  products.forEach((product) => {
      productHTML += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${(product.rating.stars)*10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${((product.priceCents)/100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select class="js-product-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  });

  document.querySelector('.js-products-grid').innerHTML = productHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
          const id = button.dataset.productId;
          addToCart(id);
          document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
          // Added to cart msg 
          let timeoutId;
          document.querySelector(`.js-added-${id}`).classList.add('view');

          if (timeoutId) {
              clearTimeout(timeoutId);
          }

          timeoutId = setTimeout(() => {
              document.querySelector(`.js-added-${id}`).classList.remove('view');
          }, 2000);
          renderItems();
      })
  });
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
}

renderItems();