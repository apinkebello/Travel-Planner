// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialise the main project folder
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log('running on local host: {$port}');
};
// create a JS object data
const projectData = {}
// a get route that returns projectData as object in the server 
app.get('/all', function(req, res){
    res.send(projectData)
})
// a post route 


app.post('/all', addData)

function addData (req, res) {
    // all the data sent by users
    let newData = req.body
    // let newData = {temperature: data.temperature,
    //     date: data.date,
    //     userResponse: data.userResponse
    // }
     console.log(newData)
    projectData.temperature = newData.temperature
    projectData.date = newData.date
    projectData.userResponse = newData.userResponse
    console.log(projectData)
    res.send("data received")
}

// MOVIE EXAMPLE
// const data = [];
// app.post('/addMovie', addMovie)

// function addMovie (req, res){
//     l
//     data.push(req.body)
    
//     console.log(data)
// }


// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowanceii

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route