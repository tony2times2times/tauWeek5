var myApp = angular.module('myApp', []);

myApp.controller('LaunchpadController', ['$scope', '$http', function($scope, $http) {
    console.log('NG Loaded');
    //$scope.assignments = [];

    $scope.getData = function() {
        console.log('getting data from server');
        //pull id off DOM!!!
      var assignmentId = '';
      var getUrl;
      if (assignmentId !== '') {
        getUrl = '/score/' + assignmentId;
      }else{
        getUrl = '/score';
      }
        $http({
            method: 'GET',
            url: getUrl
        }).then(function(response) {
            console.log('Response from server: ', response);
            $scope.assignments = response.data;
        });
    };

    $scope.postData = function() {
        console.log('posting data');
        var data = {
            assignmentName: $scope.assignmentName,
            studentName: $scope.studentName,
            score: $scope.score,
            dateTurnedIn: $scope.dateTurnedIn
        };
        $http({
            method: 'post',
            url: '/score',
            data: data
        }).then(function(response) {
            console.log('Response from server: ', response);
            $scope.getData();
        });
    };

    $scope.del = function(id) {
      console.log('deleting: ' +id);
      //not working to be updated
    };

}]);
