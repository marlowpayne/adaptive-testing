var selectors = {
    cartTemplateIdentifier: '.t-cart', // Used in workflow to assert you have reached the page
    cartCheckout: '.cart .checkout .selector'
};

var Cart = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
};

Cart.prototype.navigateToCheckout = function(browser) {
    // Navigate from Cart to Checkout
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.cartCheckout)
        .click(selectors.cartCheckout)
        .waitUntilMobified();
    return this;
};

module.exports = Cart;
