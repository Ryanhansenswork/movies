
console.log("yo mama");

var movies = []; 

main();

function main() {
    fetchMovies();
}


function fetchMovies() {
    $.ajax({
        url: "/read-data", 
        type: "GET",
        success: function (response) {
            console.log("Fetched movies from server:", response);
            movies = response;
            showTable(); 
        },
        error: function (err) {
            console.error("Error fetching movies:", err);
        }
    });
}

function showTable() {
    let htmlString = "";

    for (let i = 0; i < movies.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + movies[i].movieTitle + "</td>";
        htmlString += "<td>" + movies[i].movieDirector + "</td>";
        htmlString += "<td>" + movies[i].movieGenre + "</td>";
        htmlString += "<td>" + movies[i].movieYear + "</td>";
        htmlString += "<td>" + movies[i].movieRating + "</td>";
        htmlString += `<td><button class="delete" data-id="${movies[i].id}">Delete</button></td>`;
        htmlString += "</tr>";
    }

    $("#moviez").html(htmlString);
    deletelistener(); 
}

function deletelistener() {
    $(".delete").click(function () {
        const deleteID = $(this).attr("data-id");
        deleteMovie(deleteID); 
    });
}

function deleteMovie(id) {
    $.ajax({
        url: `/delete-record`,
        type: "DELETE",
        data: JSON.stringify({ id: id }),
        contentType: "application/json",
        success: function (response) {
            console.log("Delete response:", response);
            if (response.msg === "SUCCESS") {
                movies = movies.filter(movie => movie.id !== id);
                
                
                showTable();
            }
        },
        error: function (err) {
            console.error("Error deleting movie:", err);
        }
    });
}


