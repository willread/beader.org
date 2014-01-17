angular.module("Beader", ["ngCookies", "ngRoute", "Beader.controllers"]).
    
    config(["$provide", "$routeProvider", "$httpProvider", "$locationProvider", function($provide, $routeProvider, $httpProvider, $locationProvider){
        // Enable HTML5 routing
        
        $locationProvider.html5Mode(true);

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