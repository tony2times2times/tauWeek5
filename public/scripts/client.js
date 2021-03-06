//define my app
var myApp = angular.module('myApp', []);

myApp.controller('LaunchpadController', ['$scope', '$http', function($scope, $http) {
    console.log('NG Loaded');
    //set controller variables
    $scope.pets = [];

    //change the display when clicked
    $scope.changeClass = function(index) {
        console.log('Changing pet view for: ' + index);
        //if imageView is small then change to large and hide the info
        if ($scope.pets[index].imageView === "small-pic") {
            $scope.pets[index].imageView = "large-pic";
            $scope.pets[index].info = false;
        }
        //else the image is large, change it to small and show info
        else {
            //reset all images to the defualt display
            for (var i = 0; i < $scope.pets.length; i++) {
                $scope.pets[i].imageView = 'large-pic';
                $scope.pets[i].info = false;
            }
            //change display settings only for clicked image
            $scope.pets[index].imageView = "small-pic";
            $scope.pets[index].info = true;
        }
    };

    //adds info and view properties to each object allowing them to be changed
    $scope.createInfo = function() {
        for (var i = 0; i < $scope.pets.length; i++) {
            //add display property to each pet
            $scope.pets[i].imageView = 'large-pic';
            //add boolean info property to each pet
            $scope.pets[i].info = false;

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
            $scope.createInfo();
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
        $http({
            method: 'DELETE',
            url: ('/deletePet/' + id),
        }).then(function(response) {
            console.log('delete from server: ', response);
            //after a pet has been removed from the database get a current list of all pets
            $scope.getData();
        });
    };
    $scope.getData();
}]);
