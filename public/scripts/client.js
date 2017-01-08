var myApp = angular.module('myApp', []);

myApp.controller('LaunchpadController', ['$scope', '$http', function($scope, $http) {
    console.log('NG Loaded');
    //$scope.assignments = [];

    $scope.getData   = function() {
        console.log('getting data from server');
        $http({
            method: 'GET',
            url: '/getPets'
        }).then(function(response) {
            console.log('Response from server: ', response);
            //$scope.assignments = response.data;
        });
    };

    $scope.postData = function() {
        console.log('posting data');
        var data = {
            name: $scope.name,
            animal: $scope.animal,
            age: $scope.age,
            image: $scope.image
        };
        $http({
            method: 'post',
            url: '/postPet',
            data: data
        }).then(function(response) {
            console.log('Response from server: ', response);
            $scope.getData();
        });
    };

    $scope.del = function(id) {
        console.log('deleting: ' + id);
        //not working to be updated
    };
    $scope.getData();
}]);
