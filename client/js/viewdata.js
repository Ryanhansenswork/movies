console.log("yo mama");

var data = '[{"title":"Wolf Creek","director":"Greg McLean","genre":"Horror","yearReleased":"2005","rating":"6.2"}, {"title":"Dune: Part One","director":"Denis Villeneuve","genre":"Sci-Fi","yearReleased":"2021","rating":"8.0"}, {"title":"The Bourne Identity","director":"Doug Liman","genre":"Action/Thriller","yearReleased":"2002","rating":"7.8"}, {"title":"Alien","director":"Ridley Scott","genre":"Sci-Fi/Horror","yearReleased":"1979","rating":"8.5"}, {"title":"The Royal Tenenbaums","director":"Wes Anderson","genre":"Comedy/Drama","yearReleased":"2001","rating":"7.6"} ]';


var movies = JSON.parse(data); 

main();
function main() 
{
    console.log(movies);
    console.log(movies.length);

    showTable()
    
}

function showTable()
{
    let htmlString = "";

    for(let i = 0; i < movies.length; i++)
    {
        htmlString += "<tr>";
            htmlString += "<td>" + movies[i].title + "</td>";
            htmlString += "<td>" + movies[i].director + "</td>";
            htmlString += "<td>" + movies[i].genre + "</td>";
            htmlString += "<td>" + movies[i].yearReleased + "</td>";
            htmlString += "<td>" + movies[i].rating + "</td>";
        htmlString+= "</tr>";
    }
    $("#moviez").html(htmlString);
}