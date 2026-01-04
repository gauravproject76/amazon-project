import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary(){


    let cartItemHTML = '';

    cart.forEach((cart) => {
        products.forEach((products) => {
            if (cart.id === products.id) {

                const deliveryOptionId = cart.deliveryOptionsId;

                let deliveryOption;

                deliveryOptions.forEach((options) => {
                    if (options.id === deliveryOptionId) {
                        deliveryOption = options.deliveryDays;
                    }
                });

                const today = dayjs();
                const deliveryDate = today.add(deliveryOption, 'days');
                const dateString = deliveryDate.format('dddd, MMMM D');

                cartItemHTML += `<div class="cart-item-container js-cart-item-container-${products.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${products.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${products.name}
                    </div>
                    <div class="product-price">
                    $${(products.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${products.id}">${cart.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity js-update-${products.id}" data-product-id ="${products.id}">
                        Update
                    </span>
                    <input class="quantity-input js-input-${products.id}" />
                    <span class="save-quantity-link link-primary js-save-quantity js-save-${products.id}" data-product-id ="${products.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id ="${products.id}">
                        Delete
                    </span>
                    </div>
                </div>
                <div class="delivery-options ">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(products.id, cart)}
                </div>
                </div>
            </div>`
            }
        });

        document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
    });
    document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity();

    function deliveryOptionsHTML(id, cart) {
        let html = '';
        deliveryOptions.forEach((options) => {

            const today = dayjs();
            const deliveryDate = today.add(options.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = options.priceCents === 0
                ? 'Free'
                : `$${(options.priceCents / 100).toFixed(2)} -`;

            const isChecked = options.id === cart.deliveryOptionsId;
            html += `<div class="delivery-option js-delivery-option" data-product-id="${id}" data-delivery-option-id="${options.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
        });

        return html;
    };

    document.querySelectorAll('.js-delete-quantity').forEach((link) => {
        link.addEventListener('click', () => {
            const id = link.dataset.productId;
            removeFromCart(id);
            const container = document.querySelector(`.js-cart-item-container-${id}`);
            container.remove();
            renderOrderSummary();
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-update-quantity').forEach((link) => {
        link.addEventListener('click', () => {
            const id = link.dataset.productId;
            document.querySelector(`.js-input-${id}`).classList.add('is-editing-quantity');
            document.querySelector(`.js-save-${id}`).classList.add('is-editing-quantity');
            document.querySelector(`.js-update-${id}`).classList.add('is-displayed');
            document.querySelector(`.js-quantity-label-${id}`).classList.add('is-displayed');
        })
    });

    document.querySelectorAll('.js-save-quantity').forEach((link) => {
        link.addEventListener('click', () => {
            const id = link.dataset.productId;
            document.querySelector(`.js-input-${id}`).classList.remove('is-editing-quantity');
            document.querySelector(`.js-save-${id}`).classList.remove('is-editing-quantity');
            document.querySelector(`.js-update-${id}`).classList.remove('is-displayed');
            document.querySelector(`.js-quantity-label-${id}`).classList.remove('is-displayed');
            const newQuantity = Number(document.querySelector(`.js-input-${id}`).value);
            updateQuantity(id, newQuantity);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const id = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeliveryOption(id, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });
}