var Home = require('../pageObjects/home');
var PLP = require('../pageObjects/plp');
var PDP = require('../pageObjects/pdp');
var Cart = require('../pageObjects/cart');
var Checkout = require('../pageObjects/checkout');
var Confirmation = require('../pageObjects/confirmation');

var home;
var plp;
var pdp;
var cart;
var checkout;
var confirmation;

module.exports = {
    '@tags': ['checkout'],

    before: function(browser) {
        home = new Home(browser);
        plp = new PLP(browser);
        pdp = new PDP(browser);
        cart = new Cart(browser);
        checkout = new Checkout(browser);
        confirmation = new Confirmation(browser);
    },

    'Checkout - Guest - Step 1 - Navigate to Home': function(browser) {
        browser.preview();
        browser.waitForElementVisible(home.selectors.homeTemplateIdentifier);
        browser.assert.visible(home.selectors.homeTemplateIdentifier);
    },

    'Checkout - Guest - Step 2 - Navigate from Home to PLP': function(browser) {
        home.navigateToPLP();
        browser.waitForElementVisible(plp.selectors.plpTemplateIdentifier);
        browser.assert.visible(plp.selectors.plpTemplateIdentifier);
    },

    'Checkout - Guest - Step 3 - Navigate from PLP to PDP': function(browser) {
        plp.navigateToPDP();
        browser.waitForElementVisible(pdp.selectors.pdpTemplateIdentifier);
        browser.assert.visible(pdp.selectors.pdpTemplateIdentifier);
    },

    'Checkout - Guest - Step 4 - Add item to Shopping Cart': function(browser) {
        pdp.addItemToCart();
        browser.waitForElementVisible(pdp.selectors.cartIconTemplateIdentifier);
        browser.assert.visible(pdp.selectors.cartIconTemplateIdentifier);
    },

    'Checkout - Guest - Step 5 - Navigate from PDP to Shopping Cart': function(browser) {
        pdp.navigateToCart();
        browser.waitForElementVisible(cart.selectors.cartTemplateIdentifier);
        browser.assert.visible(cart.selectors.cartTemplateIdentifier);
    },

    'Checkout - Guest - Step 6 - Navigate from Shopping Cart to Checkout Sign In or Continue as Guest page': function(browser) {
        cart.navigateToCheckout();
        browser.waitForElementVisible(checkout.selectors.checkoutAccountTemplateIdentifier);
        browser.assert.visible(checkout.selectors.checkoutAccountTemplateIdentifier);
    },

    'Checkout - Guest - Step 7 - Continue to Guest Checkout': function(browser) {
        checkout.continueAsGuest();
        browser.waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier);
        browser.assert.visible(checkout.selectors.checkoutTemplateIdentifier);
    },

    'Checkout - Guest - Step 8 - Fill out Guest Checkout Shipping Info form': function(browser) {
        checkout.fillShippingInfo();
        browser.waitForElementVisible(checkout.selectors.lastShippingInfo);
        browser.assert.containsValue(checkout.selectors.lastShippingInfo, checkout.userData.lastShippingInfo);
    },

    'Checkout - Guest - Step 9 - Fill out Guest Checkout Payment Details form': function(browser) {
        checkout.fillPaymentDetails();
        browser.waitForElementVisible(checkout.selectors.lastPaymentDetail);
        browser.assert.containsValue(checkout.selectors.lastPaymentDetail, checkout.userData.lastPaymentDetail);
    },

    'Checkout - Guest - Step 10 - Complete Purchase to Navigate to Confirmation page': function(browser) {
        checkout.completePurchase();
        browser.waitForElementVisible(confirmation.selectors.confirmationTemplateIdentifier);
        browser.assert.visible(confirmation.selectors.confirmationTemplateIdentifier);
    },

    'Checkout - Guest - Step 11 - Check for Confirmation / Decline message': function(browser) {
        confirmation.verifyConfirmationMessage();
        browser.waitForElementVisible(confirmation.selectors.confirmationMessage);
        browser.assert.visible(confirmation.selectors.confirmationMessage);
        browser.end();
    }
};
