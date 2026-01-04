import { cart, updateCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOption.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let deliveryPriceCents = 0;

    cart.forEach((items) => {
        const productId = items.id;
        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        productPriceCents += matchingProduct.priceCents * items.quantity;

        const deliveryOptionId = items.deliveryOptionsId;
        let deliveryOption;
        
        deliveryOptions.forEach((options) => {
            if (options.id === deliveryOptionId) {
                deliveryOption = options;
            }
        });

        deliveryPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;

    const taxCents = totalBeforeTaxCents * 0.1;

    const total = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(deliveryPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}