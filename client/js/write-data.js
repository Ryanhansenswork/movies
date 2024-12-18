
document.getElementById("submit").addEventListener("click", function() {
    let movieTitle = $('#movieTitle').val();
    let movieDirector = $('#movieDirector').val();
    let movieGenre = $('#movieGenre').val();
    let movieYear = $('#movieYear').val();
    let movieRating = $('#movieRating').val();

  
    let jsonString = {
        movieTitle: movieTitle,
        movieDirector: movieDirector,
        movieGenre: movieGenre,
        movieYear: movieYear,
        movieRating: movieRating
    };

    console.log("Sending data:", JSON.stringify(jsonString));

    $.ajax({
        url: "/write-record",
        type: "POST",
        contentType: "application/json",  
        data: JSON.stringify(jsonString), 
        dataType: "json",  
        success: function(response) {
            if (response.msg === "SUCCESS") {
                alert("Data saved successfully!");
            } else {
                console.log("Error message:", response.msg);
            }
        },
        error: function(err) {
            console.log("Error:", err);
        }
    });
});

