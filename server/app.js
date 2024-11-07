const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//page listeners (router)
let router = require('./router.js');

router(app);

//service listeners (data processes)

let services = require('./services.js')

services(app);


let port = 5000;

//listen

let server = app.listen(port, function(err)
{
    if(err) throw err
    console.log("listening on port:" + port);
});