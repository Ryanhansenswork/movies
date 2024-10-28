document.getElementById("submit").addEventListener("click", function() 
{
    alert("Submit button was pressed"); 
});

document.getElementById("clear").addEventListener("click", function() 
{
    document.getElementById("title").value = "";
    document.getElementById("director").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("year").value = "";
    document.getElementById("rating").value = "";
});
