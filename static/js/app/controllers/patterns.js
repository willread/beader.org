angular.module("Beader.controllers").controller("PatternsCtrl", ["$scope", "$http", function($scope, $http){
        top.patternsScope = $scope;

        $http.get("/patterns").
            success(function(patterns){
                $scope.patterns = patterns;
            });
    }]);