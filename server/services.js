const fs = require('fs');
const path = require("path");
const { stringify } = require('querystring');

const DB_FILE = path.join(__dirname, './files/data.txt');

let services = function(app) {
    app.post('/write-record', function(req, res) {
        let id = "mov" + Date.now();

        let data = {
            id: id,
            movieTitle: req.body.movieTitle,
            movieDirector: req.body.movieDirector,
            movieGenre: req.body.moviegenre,
            movieYear: req.body.movieYear,
            movieRating: req.body.movieRating
        };
        
        let movieData = [];
        if (fs.existsSync(DB_FILE)) {
            fs.readFile(DB_FILE, "utf8", function(err, fileData) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    movieData = JSON.parse(fileData);
                    movieData.push(data);

                    fs.writeFile(DB_FILE, JSON.stringify(movieData), function(err) {
                        if (err) {
                            res.send(JSON.stringify({ msg: err }));
                        } else {
                            res.send(JSON.stringify({ msg: "SUCCESS" }));
                        }
                    });
                }
            });
        } else {
            movieData.push(data);
            console.log(JSON.stringify(data));
            
            fs.writeFile(DB_FILE, JSON.stringify(movieData), function(err) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    res.send(JSON.stringify({ msg: "SUCCESS" }));
                }
            });
        }
    });
};

module.exports = services;



/*const fs = require('fs');
const path = require("path");

const DB_FILE = path.join(__dirname + './files/data.txt');

let services = function(app)

{
    app.post('/write-record', function(req, res)
{
    let id = "mov" + Date.now();

    let data = 
    {
        id: id,
        title: req.body.movieTitle,
        director: req.body.movieDirector, 
        genre: req.body.moviegenre, 
        year: req.body.movieYear, 
        rating:req.body.movieRating
    }
    let movieData = [];
    if(fs.existsSync(DB_FILE))
    {
        //read in current database
        fs.readFile(DB_FILE, "utf8", function(err, data)
    {
        if(err)
        {
            res.send(JSON.stringify({msg: err}))
        }
        else
        {
            data = JSON.parse(data);

            movieData.push(data);

            fs.writeFile(DB_FILE, JSON.stringify(movieData), function(err)
        {
            if (err)
            {
                res.send(JSON.stringify({msg: err}))
            }
            else{
                res.send(JSON.stringify({msg: "SUCCESS"}));
            }
        })
        }
    })
    }else{
        movieData.push(bookData);

        fs.writeFile(DB_FILE, JSON.stringify(movieData), function(err)
        {
            if (err)
            {
                res.send(JSON.stringify({msg: err}))
            }
            else{
                res.send(JSON.stringify({msg: "SUCCESS"}));
            }
        })
    }
}
})
   

module.exports = services;*/