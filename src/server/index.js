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
  // ProjectTravelData['depCity'] = req.body.depCity;
  // ProjectTravelData['arrCity'] = req.body.arrCity;
  // ProjectTravelData['depDate'] = req.body.depDate;
  // ProjectTravelData['weather'] = req.body.weather;
  // ProjectTravelData['description'] = req.body.summary;
  // ProjectTravelData['daysLeft'] = req.body.daysLeft;
  res.send(ProjectTravelData);
}

// To get data to geonames API
app.get('/geonames', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
 
      

const port = 8080;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);



  //     res.send(JSON.stringify({data }))


}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
