var app = angular.module('movieApp', []);

app.controller('MovieController', function($scope, $http) {
    $http.get('/read-data')  
        .then(function(response) {
            $scope.movies = response.data; 
            $scope.currentIndex = 0;
            $scope.currentRecord = $scope.movies[$scope.currentIndex];
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });

    $scope.nextRecord = function() {
        if ($scope.currentIndex < $scope.movies.length - 1) {
            $scope.currentIndex++;
            $scope.currentRecord = $scope.movies[$scope.currentIndex];
        }
    };

    $scope.previousRecord = function() {
        if ($scope.currentIndex > 0) {
            $scope.currentIndex--;
            $scope.currentRecord = $scope.movies[$scope.currentIndex]; 
        }
    };
});

