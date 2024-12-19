
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
const app = express();

app.use(express.json()); 

const MONGO_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "movieArchive"; 
const COLLECTION_NAME = "movies"; 

let db;
MongoClient.connect(MONGO_URL)
    .then(client => {
        console.log("Connected to MongoDB");
        db = client.db(DATABASE_NAME);
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    });

let services = function (app) {

    app.delete('/delete-record', async (req, res) => {
        const idToDelete = req.body.id;

        try {
            const result = await db.collection(COLLECTION_NAME).deleteOne({ id: idToDelete });
            if (result.deletedCount > 0) {
                res.json({ msg: "SUCCESS" });
            } else {
                res.status(404).json({ msg: "NOT FOUND" });
            }
        } catch (err) {
            console.error("Error deleting record:", err);
            res.status(500).json({ msg: "Error deleting record" });
        }
    });

    app.get("/read-data", async (req, res) => {
        try {
            const movies = await db.collection(COLLECTION_NAME).find().toArray();
            res.status(200).json(movies);
        } catch (err) {
            console.error("Error reading data:", err);
            res.status(500).json({ msg: "Error reading data" });
        }
    });
    app.put('/update-record', async (req, res) => {
        const movieData = req.body;
        console.log("Incoming movie data for update:", movieData);
    
        if (!movieData.id) {
            return res.status(400).json({ msg: "Invalid movie data, missing ID" });
        }
    
        const { _id, ...movieToUpdate } = movieData; 
    
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { id: movieData.id }, 
                { $set: movieToUpdate }  
            );
            console.log("Update result:", result);
            if (result.matchedCount > 0) {
                res.json({ msg: "SUCCESS" });
            } else {
                res.status(404).json({ msg: "NOT FOUND" });
            }
        } catch (err) {
            console.error('Error updating record:', err);
            res.status(500).json({ msg: "Error updating record" });
        }
    });
    

    app.get('/read-data-by-type', async (req, res) => {
        const { type, value } = req.query;
        try {
            const movies = await db.collection(COLLECTION_NAME).find({ [type]: value }).toArray();
            res.status(200).json(movies);
        } catch (err) {
            console.error("Error fetching movies by type:", err);
            res.status(500).json({ msg: "Error fetching movies by type" });
        }
    });

    app.post('/write-record', async (req, res) => {
        let id = "mov" + Date.now();

        let data = {
            id: id,
            movieTitle: req.body.movieTitle,
            movieDirector: req.body.movieDirector,
            movieGenre: req.body.movieGenre,
            movieYear: req.body.movieYear,
            movieRating: req.body.movieRating
        };

        try {
            await db.collection(COLLECTION_NAME).insertOne(data);
            res.json({ msg: "SUCCESS" });
        } catch (err) {
            console.error("Error writing record:", err);
            res.status(500).json({ msg: "Error writing record" });
        }
    });
};

module.exports = services;
