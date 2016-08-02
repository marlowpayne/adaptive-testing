var selectors = {
    homeTemplateIdentifier: '.t-home', // Used in workflow to assert you have reached the page
    plpItem: '.plp .item .selector'
};

var Home = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
};

Home.prototype.navigateToPLP = function(browser) {
    // Navigate from Home to PLP
    this.browser
        .log('Navigating to PLP')
        .waitForElementVisible(selectors.plpItem)
        .click(selectors.plpItem)
        .waitUntilMobified();
    return this;
};

module.exports = Home;
