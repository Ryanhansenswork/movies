angular.module('movieApp', [])
.controller('MovieController', ['$http', function($http) {
    const movieCtrl = this;

    movieCtrl.movies = [];
    movieCtrl.sortType = 'movieDirector'; 
    movieCtrl.showUpdateModal = false;
    movieCtrl.editMovie = {};

    movieCtrl.getMovies = function() {
        $http.get('/read-data')
            .then(response => {
                movieCtrl.movies = response.data;
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    };

    movieCtrl.deleteMovie = function(id) {
        $http.delete('/delete-record', { data: { id }, headers: { "Content-Type": "application/json" } })
            .then(response => {
                alert(response.data.msg);
                movieCtrl.getMovies();
            })
            .catch(error => {
                console.error("Error deleting movie:", error);
            });
    };


    movieCtrl.openUpdateModal = function(movie) {
        movieCtrl.editMovie = angular.copy(movie);
        movieCtrl.showUpdateModal = true;
    };

    movieCtrl.closeUpdateModal = function() {
        movieCtrl.showUpdateModal = false;
        movieCtrl.editMovie = {};
    };

    movieCtrl.updateMovie = function (movie) {
        if (!movie.id) {
            alert("Movie ID is missing. Cannot update.");
            return;
        }
    
        $http.put('/update-record', movie)
            .then(function (response) {
                console.log("Update response:", response);
                if (response.data.msg === 'SUCCESS') {
                    alert("Movie updated successfully!");
                    movieCtrl.closeUpdateModal();  
                    movieCtrl.getMovies(); 
                } else {
                    alert("Error updating movie: " + response.data.msg);
                }
            })
            .catch(function (err) {
                console.error('Error updating movie:', err);
                alert("Error updating movie. Please try again.");
            });
    };
    
    movieCtrl.getMovies();
}]);


