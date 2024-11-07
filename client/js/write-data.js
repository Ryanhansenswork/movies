document.getElementById("submit").addEventListener("click", function() 
{
    //alert("Submit button was pressed"); 
    let movieTitle = $('#movieTitle').val();
    let movieDirector = $('#movieDirector').val();
    let movieGenre = $('#movieGenre').val();
    let movieYear = $('#movieYear').val();
    let movieRating = $('#movieRating').val();

    let jsonString = {movieTitle: movieTitle, 
        movieDirector: movieDirector, 
        movieGenre: movieGenre, 
        movieYear:movieYear, 
        movieRating:movieRating};
        console.log(JSON.stringify(jsonString))
    $.ajax({
        url: moviesURL = "/write-record",
        type: "post",
        data: jsonString,
        success: function(response)
        {
            let data = JSON.parse(response);
            if (data.msg = "SUCCESS")
            {
                alert("data saved")
            }
            else
            {
                console.log(data.msg)
            }
        },
        error: function(err)
        {
            console.log(err)
        }
    })
    });

document.getElementById("clear").addEventListener("click", function() 
{
    document.getElementById("movieTitle").value = "";
    document.getElementById("movieDirector").value = "";
    document.getElementById("movieGenre").value = "";
    document.getElementById("movieYear").value = "";
    document.getElementById("movieRating").value = "";
});
