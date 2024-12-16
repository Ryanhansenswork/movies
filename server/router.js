const fs = require("fs");
const path = require("path");

//page listeners
let router = function(app)
{
    app.get("/", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/movies.html"));
    });
    app.get("/home", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/movies.html"));
    });
    app.get("/write-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-data.html"));
    });
    app.get("/view-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/view-data.html"));
    });
    app.get("/browse-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-data.html"));
    });
    /*app.get("/read-data", function (req, res) {
        const dataFilePath = path.join(__dirname, "../files/data.txt");

        fs.readFile(dataFilePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                res.status(500).send({ msg: "Error reading data" });
                return;
            }

            // Convert text file content into JSON array
            try {
                const jsonData = data.trim().split("\n").map(line => JSON.parse(line));
                res.status(200).json(jsonData); // Send JSON response
            } catch (parseError) {
                console.error("Error parsing file data:", parseError);
                res.status(500).send({ msg: "Error parsing data" });
            }
        });
    });*/
}

module.exports = router;