var selectors = {
    confirmationTemplateIdentifier: '.t-confirmation', // Used in workflow to assert you have reached the page
    confirmationMessage: '.confirmation .message .selector',
    declineMessage: '.decline .message .selector'
};

var Confirmation = function(browser) {
    this.browser = browser;
    this.selectors = selectors;
};

Confirmation.prototype.verifyConfimationMessage = function(browser) {
    // Assert you are shown the confirmation message
    this.browser
        .log('Verifying confirm/decline message is present')
        .waitForElementVisible(selectors.declineMessage)
        .verify.elementPresent(selectors.declineMessage)
        .waitUntilMobified();
    return this;
};

module.exports = Confirmation;
