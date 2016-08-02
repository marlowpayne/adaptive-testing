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

    'Checkout - Registered - Step 1 - Navigate to Home': function(browser) {
        browser.preview();
        browser.waitForElementVisible(home.selectors.homeTemplateIdentifier);
        browser.assert.visible(home.selectors.homeTemplateIdentifier);
    },

    'Checkout - Registered - Step 2 - Navigate from Home to PLP': function(browser) {
        home.navigateToPLP();
        browser.waitForElementVisible(plp.selectors.plpTemplateIdentifier);
        browser.assert.visible(plp.selectors.plpTemplateIdentifier);
    },

    'Checkout - Registered - Step 3 - Navigate from PLP to PDP': function(browser) {
        plp.navigateToPDP();
        browser.waitForElementVisible(pdp.selectors.pdpTemplateIdentifier);
        browser.assert.visible(pdp.selectors.pdpTemplateIdentifier);
    },

    'Checkout - Registered - Step 4 - Add item to Shopping Cart': function(browser) {
        pdp.addItemToCart();
        browser.waitForElementVisible(pdp.selectors.cartIconTemplateIdentifier);
        browser.assert.visible(pdp.selectors.cartIconTemplateIdentifier);
    },

    'Checkout - Registered - Step 5 - Navigate from PDP to Shopping Cart': function(browser) {
        pdp.navigateToCart();
        browser.waitForElementVisible(cart.selectors.cartTemplateIdentifier);
        browser.assert.visible(cart.selectors.cartTemplateIdentifier);
    },

    'Checkout - Registered - Step 6 - Navigate from Shopping Cart to Checkout Sign In or Continue as Guest page': function(browser) {
        cart.navigateToCheckout();
        browser.waitForElementVisible(checkout.selectors.checkoutAccountTemplateIdentifier);
        browser.assert.visible(checkout.selectors.checkoutAccountTemplateIdentifier);
    },

    'Checkout - Registered - Step 7 - Continue to Registered Checkout': function(browser) {
        checkout.continueAsRegistered();
        browser.waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier);
        browser.assert.visible(checkout.selectors.checkoutTemplateIdentifier);
    },

    'Checkout - Registered - Step 8 - Fill out Registered Checkout Payment Details form': function(browser) {
        checkout.fillPaymentDetails();
        browser.waitForElementVisible(checkout.selectors.lastPaymentDetail);
        browser.assert.containsValue(checkout.selectors.lastPaymentDetail, checkout.userData.lastPaymentDetail);
    },

    'Checkout - Registered - Step 9 - Complete Purchase to Navigate to Confirmation page': function(browser) {
        checkout.completePurchase();
        browser.waitForElementVisible(confirmation.selectors.confirmationTemplateIdentifier);
        browser.assert.visible(confirmation.selectors.confirmationTemplateIdentifier);
    },

    'Checkout - Registered - Step 10 - Check for Confirmation / Decline message': function(browser) {
        confirmation.verifyConfirmationMessage();
        browser.waitForElementVisible(confirmation.selectors.confirmationMessage);
        browser.assert.visible(confirmation.selectors.confirmationMessage);
        browser.end();
    }
};
