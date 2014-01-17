angular.module("Beader", ["ngCookies", "ngRoute", "Beader.controllers"]).
    
    config(["$provide", "$routeProvider", "$httpProvider", function($provide, $routeProvider, $httpProvider){
        // Handle application routes

        $routeProvider.

            when("/create", {
                templateUrl: "templates/designer.html",
                controller: "DesignerCtrl",
                title: "Design a Pattern"
            });
    }]).

    run(["$window", "$rootScope", "$location", "$http", function($window, $rootScope, $location, $http){
        top.appScope = $rootScope; // Expose app scope for debugging

    }]);