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

// Function to POST data

// const travelData = async (url= 'http://api.geonames.org/search.json?&q='+city+'&geonamesKey='+username, data = {})=>{
//         console.log(data) 
//     const response = await fetch(url, {
//             method: 'POST', // GET, POST, DELETE, PUT, etc
//             credentials: 'same-origin', // include, same origin, omit
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data), //body data type must match "Content-Type" header
//         })}

        // app.post('http://api.geonames.org/', function (req, res) {
        
// A promises based node.js wrapper for the Geonames.org API.
        // geocoder.get('search',{
        //     q: 'Berlin'
        //   })
        //   .then(function(response){
        //     console.log(response);
        //   })
        //   .catch(function(error){
        //     console.log(error);
        //   });
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })
