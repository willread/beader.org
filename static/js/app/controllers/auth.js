angular.module("Beader.controllers").controller("AuthCtrl", ["$scope", "$http", "$timeout", function($scope, $http, $timeout){
        top.authScope = $scope;

        $scope.fetchUser = function(){
            $http.get("/user").
                success(function(user){
                    $scope.user = user;
                }).
                error(function(error){
                    delete $scope.user;
                });
        };

        $scope.fetchUser();

        $scope.checkGoogleLogin = function(){
            var loginComplete;
            try {
                loginComplete = $scope.googleLoginWindow.document.URL.indexOf("/return") > -1;
            }catch(e){}

            if(loginComplete){ // FIXME
                $scope.fetchUser();
                $scope.googleLoginWindow.close();
            }else{
                // Reschedule
                $scope.checkGoogleLoginTimeout = $timeout($scope.checkGoogleLogin, 100);
            }
        };

        $scope.googleLogin = function(){
            $scope.googleLoginWindow = window.open("/auth/google", "Log In With Google", "width=600, height=600");
            $scope.checkGoogleLogin();
        };

        $scope.checkGoogleLogout = function(){
            if($scope.googleLogoutWindow.contentWindow.document.URL.indexOf("/return") > -1){ // FIXME
                $scope.fetchUser();
                document.body.removeChild($scope.googleLogoutWindow);
                delete $scope.googleLogoutWindow;
            }else{
                // Reschedule
                $scope.checkGoogleLogoutTimeout = $timeout($scope.checkGoogleLogout, 100);
            }
        };

        $scope.googleLogout = function(){
            $scope.googleLogoutWindow = document.createElement("iframe");
            $scope.googleLogoutWindow.style.display = "none";
            $scope.googleLogoutWindow.src = "/auth/logout";
            document.body.appendChild($scope.googleLogoutWindow);

            $scope.checkGoogleLogout();
        }
    }]);