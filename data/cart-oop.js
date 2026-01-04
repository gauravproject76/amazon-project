function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFormStorage: function(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [{
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionsId: '1'
                }];
            }
        },

        saveToStorage: function() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart: function(id) {
            let matchingItem;

            this.cartItems.forEach((items) => {
                if (id === items.id) {
                    matchingItem = items;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += 1;
            }else{
                this.cartItems.push({
                    id: id,
                    quantity: 1,
                    deliveryOptionsId: '1'
                })
            }

            this.saveToStorage();
        },

        //short hand of function used

        removeFromCart(productId) {
            let newCart = [];
            this.cartItems.forEach((cartitem) => {
                if (productId !== cartitem.id) {
                    newCart.push(cartitem);
                }
            });

            this.cartItems = newCart;

            this.saveToStorage();
        },

        updateCartQuantity() {
            let cartQuantity = 0;

            this.cartItems.forEach((items) => {
                cartQuantity += items.quantity;
            })

            return cartQuantity;
        },

        updateQuantity(id, newQuantity) {
            this.cartItems.forEach((items) => {
                if (id === items.id) {
                    items.quantity = newQuantity;
                    this.saveToStorage();
                }
            })
        },

        updateDeliveryOption(id, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((items) => {
                if (id === items.id) {
                    matchingItem = items;
                }
            });

            matchingItem.deliveryOptionsId = deliveryOptionId;

            this.saveToStorage();
        }
    };

    return cart;
};

const cart = Cart('cart-oop');
const bussinessCart = Cart('bussiness-cart');

cart.loadFormStorage();
bussinessCart.loadFormStorage();

console.log(cart);
console.log(bussinessCart);