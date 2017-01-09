//define my app
var myApp = angular.module('myApp', []);

myApp.controller('LaunchpadController', ['$scope', '$http', function($scope, $http) {
    console.log('NG Loaded');
    //set controller variables
    $scope.pets = [];
    //this view thing is something i was trying to change the appearence of outline
    //search result... it didnt go to plan more research needs to be done.
    $scope.view = "small-pic";
    //toggle info view and picture view... it does NOT WORK!
    $scope.changeClass = function(index) {
        console.log('Changing pet view for: ' + index );
        if ($scope.view === "small-pic")
            $scope.view = "large-pic";
        else
            $scope.info.hide();
            $scope.view = "small-pic";
    };
    //NG repeate creates a new scope making it difuclt to access a  index
    //this was my attempt at solving that but im not sure how or if i will use it.
    $scope.createIndex = function() {
        for (var i = 0; i < $scope.pets.length; i++) {
            $scope.pets[i].index = i;
        }
    };

    //get pets from the server and add them to the pets array
    $scope.getData = function() {
        console.log('getting data from server');
        // make http request
        $http({
            method: 'GET',
            url: '/getPets'
        }).then(function(response) {
            console.log('Response from server: ', response);
            //set response equal to pets array
            $scope.pets = response.data;
            console.log("there are the pets" + $scope.pets[0].name);
            $scope.createIndex();
        });
    };

    //post pets to the server
    $scope.postData = function() {
        console.log('posting data');
        //gather pet data from the input boxes on the DOM
        var data = {
            name: $scope.name,
            animal: $scope.animal,
            age: $scope.age,
            image: $scope.image
        };
        //reset text boxes so the next pet can be added
        $scope.name = null;
        $scope.animal = '';
        $scope.age = '';
        $scope.image = '';
        //make http request to post the pet to the server
        $http({
            method: 'post',
            url: '/postPet',
            data: data
        }).then(function(response) {
            console.log('Response from server: ', response);
            //after a pet has been added to the database get a current list of all pets
            $scope.getData();
        });
    };

    $scope.del = function(id) {
        console.log('deleting: ' + id);
        //not working to be updated
    };
    $scope.getData();
}]);
