const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


app.use(express.json()); 

const DB_FILE = path.join(__dirname, './files/data.txt');

let services = function(app) {

   app.delete('/delete-record', function (req, res) {
    const idToDelete = req.body.id;
    
    if (!fs.existsSync(DB_FILE)) {
        return res.send(JSON.stringify({ msg: "FILE NOT FOUND" }));
    }

    fs.readFile(DB_FILE, "utf8", function (err, data) {
        if (err) {
            return res.send(JSON.stringify({ msg: err }));
        }

        let movieData = JSON.parse(data);
        const updatedMovies = movieData.filter(movie => movie.id !== idToDelete);

        fs.writeFile(DB_FILE, JSON.stringify(updatedMovies), function (err) {
            if (err) {
                return res.send(JSON.stringify({ msg: err }));
            }

            res.send(JSON.stringify({ msg: "SUCCESS" }));
        });
    });
});

   app.get("/read-data", (req, res) => {
    const filePath = path.join(__dirname, "./files/data.txt");

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading data.txt:", err);
            res.status(500).json({ msg: "Error reading data" });
        } else {
            try {
                const movies = JSON.parse(data);
                res.status(200).json(movies);
            } catch (parseError) {
                console.error("Error parsing data:", parseError);
                res.status(500).json({ msg: "Error parsing data" });
            }
        }
    });
});
    
    
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
