(function(){
    var scripts = [
        "js/lib/json2.js",
        "js/lib/uri.js",
        "js/lib/jquery.js",
        "js/lib/jquery-ui.js",
        "js/lib/bootstrap.min.js",
        "js/lib/angular.js",
        "js/lib/angular-resource.js",
        "js/lib/angular-cookies.js",
        "js/lib/angular-mocks.js",
        "js/lib/angular-route.js",
        "js/lib/modernizr.js",
        "js/lib/moment.min.js",
        "js/config.js",
        "js/app/app.js",
        "js/app/controllers/designer.js"
    ];

    for(var s in scripts){
        document.write("<script src='" + scripts[s] + "'></script>");
    }
})();