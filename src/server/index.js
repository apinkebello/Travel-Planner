const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const GeocoderGeonames = require('geocoder-geonames')
// let lodash = require('lodash')

// let city = 'Berlin'
let username = 'apinkebello'
// let geonamesKey = username




    // geocoder = new GeocoderGeonames({
    //   username:      'apinkebello',
    // });


  // End points for all route
let ProjectTravelData= {};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

// Get route

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// Post Route
app.post('/add', addData);

function addData(req, res) {
  projectData['destination'] = req.body.destination;
  projectData['travelDate'] = req.body.travelDate;
  projectData['returnBack'] = req.body.returnBack;
  projectData['highTemp'] = req.body.highTemp;
  projectData['lowTemp'] = req.body.lowTemp; 
  projectData['weatherLike'] = req.body.weatherLike;
  projectData['daysToTravel'] = req.body.daysToTravel;
  projectData['placeImage'] = req.body.placeImage;
  
  
  res.send(ProjectData);
}

// // To get data to geonames API
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
 
      
// designates what port the app will listen to for incoming requests
const port = 8081;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

