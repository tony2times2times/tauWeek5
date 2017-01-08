var myApp = angular.module('myApp', []);



myApp.controller('LaunchpadController', ['$scope', '$http', function($scope, $http) {
    console.log('NG Loaded');

    $scope.pets = [];

    $scope.view = "small-pic";
    //toggle info view and picture view
    $scope.changeClass = function(index) {
        console.log('Changing pet view for: ' + index );
        if ($scope.view === "small-pic")
            $scope.view = "large-pic";
        else
            $scope.view = "small-pic";
    };

    $scope.createIndex = function() {
        for (var i = 0; i < $scope.pets.length; i++) {
            $scope.pets[i].index = i;
        }
    };

    $scope.getData = function() {
        console.log('getting data from server');
        $http({
            method: 'GET',
            url: '/getPets'
        }).then(function(response) {
            console.log('Response from server: ', response);
            $scope.pets = response.data;
            console.log("there are the pets" + $scope.pets[0].name);
            $scope.createIndex();
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
        $scope.name = null;
        $scope.animal = '';
        $scope.age = '';
        $scope.image = '';
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
