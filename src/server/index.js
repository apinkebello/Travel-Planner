const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');

// End points for all route
const ProjectTravelData= {};

const app = express();
app.use(cors());
// to use json
app.use(express.json());
// to use url encoded values
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('dist'));

// Get route
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

// Post Route
app.post('/addData', addData);
// 
app.get('/getData', (req, res) => { res.send(ProjectTravelData) });

function addData(req, res) {
  ProjectTravelData["weatherData"] = req.body.data;
  res.send({"success": true});
}

const retrieveData = (req, res) => {
  res.send(ProjectTravelData);
}
 
module.exports = app;