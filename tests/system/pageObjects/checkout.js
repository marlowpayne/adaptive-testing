var selectors = {
    checkoutTemplateIdentifier: '.t-checkout', // Used in workflow to assert you have reached the page
    checkoutAccountTemplateIdentifier: '.t-account', // Used in workflow to assert you have reached the page
    continueAsGuest: '.continue .guest .selector',
    continueAsRegistered: '.continue .registered .selector',
    completePurchase: '.complete .purchase .selector',

    registeredEmail: '.registered .email .selector',
    registeredPassword: '.registered .password .selector',

    firstName: '.first .name .selector',
    lastName: '.last .name .selector',
    lastShippingInfo: '.last .shipping .info .selector', // Used in workflow to assert you have filled out all Shipping Info

    creditCardName: '.creditcard .name .selector',
    creditCardNumber: '.creditcard .number .selector',
    lastPaymentDetail: '.last .payment .detail .selector' // Used in workflow to assert you have filled out all Payment Details
};

var userData = {
    // Export a test email and password as environment variables with the following names
    registeredEmail: process.env['MARLOWS-TESTING-PROJECT_EMAIL'],
    registeredPassword: process.env['MARLOWS-TESTING-PROJECT_PASSWORD'],

    firstName: 'John',
    lastName: 'Doe',
    lastShippingInfo: 'Last Shipping Info Field', // Used in workflow to assert you have filled out all Shipping Info

    creditCardName: 'John Doe',
    creditCardNumber: '1234567812345678',
    lastPaymentDetail: 'Last Payment Detail Field' // Used in workflow to assert you have filled out all Payment Details
};

var Checkout = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
    this.userData = userData;
};

Checkout.prototype.continueAsGuest = function(browser) {
    // Select Continue as Guest / Guest Checkout
    this.browser
        .log('Navigating to Guest Checkout')
        .waitForElementVisible(selectors.continueAsGuest)
        .click(selectors.continueAsGuest)
        .waitUntilMobified();
    return this;
};

Checkout.prototype.continueAsRegistered = function(browser) {
    // Sign in to continue Registered Checkout
    this.browser
        .log('Navigating to Registered Checkout')
        .waitForElementVisible(selectors.registeredEmail)
        .setValue(selectors.registeredEmail, userData.registeredEmail)
        .setValue(selectors.registeredPassword, userData.registeredPassword)
        .waitForElementVisible(selectors.continueAsRegistered)
        .click(selectors.continueAsRegistered)
        .waitUntilMobified();
    return this;
};

Checkout.prototype.fillShippingInfo = function(browser) {
    // Fill out Shipping info form fields
    this.browser
        .log('Fill out Shipping Info form fields')
        .setValue(selectors.firstName, userData.firstName)
        .setValue(selectors.lastName, userData.lastName)
        //...
        .setValue(selectors.lastShippingInfo, userData.lastShippingInfo);
    return this;
};

Checkout.prototype.fillPaymentDetails = function(browser) {
    // Fill out Payment details form fields
    this.browser
        .log('Fill out Payment Details form fields')
        .setValue(selectors.creditCardName, userData.creditCardName)
        .setValue(selectors.creditCardNumber, userData.creditCardNumber)
        //...
        .setValue(selectors.lastPaymentDetail, userData.lastPaymentDetail);
    return this;
};

Checkout.prototype.completePurchase = function(browser) {
    // Complete purchase
    this.browser
        .log('Complete purchase')
        .waitForElementVisible(selectors.completePurchase)
        .click(selectors.completePurchase)
        .waitUntilMobified();
    return this;
};

module.exports = Checkout;
