var selectors = {
    plpTemplateIdentifier: '.t-plp', // Used in workflow to assert you have reached the page
    pdpItem: '.pdp .item .selector'
};

var PLP = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
};

PLP.prototype.navigateToPDP = function(browser) {
    // Navigate from PLP to PDP
    this.browser
        .log('Navigating to PDP')
        .waitForElementVisible(selectors.pdpItem)
        .click(selectors.pdpItem)
        .waitUntilMobified();
    return this;
};

module.exports = PLP;
