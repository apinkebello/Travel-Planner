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




    geocoder = new GeocoderGeonames({
      username:      'apinkebello',
    });


  // End points for all route
let TravelData= {};

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
app.post('/add', addInfo);

// function addInfo(req, res) {
//   travelData['depCity'] = req.body.depCity;
//   travelData['arrCity'] = req.body.arrCity;
//   travelData['depDate'] = req.body.depDate;
//   travelData['weather'] = req.body.weather;
//   travelData['summary'] = req.body.summary;
//   travelData['daysLeft'] = req.body.daysLeft;
//   res.send(travelData);
// }

// To get data to geonames API
app.get('/geonames', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/geonames', function (req, res) {

  console.log(req.body)
  let city = req.body.city;
  let baseURL= `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&fuzzy=0&username=${username}`
  
  
  fetch(baseURL)
 
  .then(response => response.json())
  .then(function(data) {
      console.log(data) 
      





  //     res.send(JSON.stringify({data }))
  })

})




/
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
