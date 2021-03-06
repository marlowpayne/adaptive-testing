var selectors = {
    pdpTemplateIdentifier: '.t-pdp', // Used in workflow to assert you have reached the page
    addItemButton: '.add .item .button',
    cartIcon: '.cart .icon .selector',
    goToCart: '.goto .cart .selector'
};

var PDP = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
};

PDP.prototype.addItemTocart = function(browser) {
    // Add an item to the cart
    this.browser
        .log('Adding item to cart')
        .waitForElementVisible(selectors.addItem)
        .click(selectors.addItem)
        .waitUntilMobified();
    return this;
};

PDP.prototype.navigateTocart = function(browser) {
    // Navigate from PDP to Cart
    this.browser
        .log('Navigating to cart')
        .waitForElementVisible(selectors.goToCart)
        .click(selectors.goToCart)
        .waitUntilMobified();
    return this;
};

module.exports = PDP;
