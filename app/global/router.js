define([
    '$',
    'adaptivejs/router',
    'pages/home/home-view'
],
function($, Router, Home) {
    var router = new Router();

    router
        .add(Router.selectorMatch('body.home'), Home)
        .add(Router.urlMatch('/foo'), Home)
        .add(function() {return true;}, Home);

    return router;
});
