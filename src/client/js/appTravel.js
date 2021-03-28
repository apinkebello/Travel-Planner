/*Global Variables*/
import { checkForName } from "./travelCheck";

const geoUsername = "apinkebello";
const geoResults = {};
// let daysLeft = 'number of days left to undertake the trip'
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const timestamp = currentDate
const timestampNow = (Date.now()) / 1000
const daysLeft = Math.round((timestamp - timestampNow)/86400);

//  Function called once form is submitted these values are inputed

function handleSubmit(event) {
  event.preventDefault();
  // Input Travel dates (Leaving Dates, return Dates, Destination)
  let cityGoing = document.getElementById("city").value;
  let startDate = document.getElementById("date_leaving").value;
  let retDate = document.getElementById("date_return").value;
  let cityLeaving = document.getElementById("city_leave").value;
  geoResults["departureDate"] = startDate;
  geoResults["returnDate"] = retDate;
  geoResults["cityGoing"] = cityGoing;
  geoResults["city_leave"] = cityLeaving;
  geonamesData(cityGoing);
  
}

// function performForecast(e){
//   const newZip = document.getElementById('zip').value;
//   console.log(newZip)
//   getWeatherData(baseURL,newZip,apiKey)
//   .then(function(data){
//       console.log(data.main.temp)
//       const temp = data.main.temp;
//       const date = currentDate;
//       const userResponse = document.getElementById('feelings').value;
//       projectData('http://localhost:8000/all', {temperature:temp, date:date, userResponse:userResponse})
//       .then(function(newData){
//           console.log(newData)
//           retrieveWeatherData('http://localhost:8000/all')
//           .then(function(data){
//               updateUI(data)
//            }
//           )
//       }) 
//   })
// }
const geonamesData = async city => {
  
  const  geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;

  const geoResponse = await fetch( geoURL);
  try {
      const geoResult = await geoResponse.json();
      geoResults["City"] = geoResult["geonames"][0]["toponymName"];
      geoResults["country"] = geoResult["geonames"][0]["countryName"];
      geoResults["long"] = geoResult["geonames"][0]["lng"];
      geoResults["lat"] = geoResult["geonames"][0]["lat"];
      travelWeather(geoResults);
      travelImage(geoResults);
       userData(geoResults);
  } catch (error) {
      console.log(error);
  }
};

// getCityInfo(geoNamesURL, goingToText, username)
//     .then((cityData) => {
//       const cityLat = cityData.geonames[0].lat;
//       const cityLong = cityData.geonames[0].lng;
//       const country = cityData.geonames[0].countryName;
//       const weatherData = getWeather(cityLat, cityLong, country, timestamp)
//       return weatherData;
//     })
//     .then((weatherData) => {
//       const daysLeft = Math.round((timestamp - timestampNow) / 86400);
//       const userData = postData('http://localhost:5500/add', { leavingFromText, goingToText, depDateText, weather: weatherData.currently.temperature, summary: weatherData.currently.summary, daysLeft });
//       return userData;
//     }).then((userData) => {
//       updateUI(userData);
//     })
const travelWeather = async geonamesData => {
  const lat = await geonamesData["lat"];
  const lon = await geonamesData["long"];
  const travelAPIKey = "b4e06de07c5d4a00b2ffb49f7a0536c3";
  const WeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
  const travelWeatherData = await fetch(WeatherURL);
  try {
      const travelResult = await travelWeatherData.json();
      geonamesData['high_temp'] = travelResult['data'][0]['high_temp'];
      geonamesData['low_temp'] = travelResult['data'][0]['low_temp'];
      geonamesData['description'] = travelResult['data'][0]['weather']['description']
      
  } catch (error) {
      console.log(`error: ${error}`)
  }
}
const travelImage = async geonamesData => {
  const travelImageCity = geonamesData['City'];
  const pixAPIKey = '20878180-a358efec6a521e8223bbd10f1';
  const   imageUrlData = `https://pixabay.com/api/?key=${pixAPIKey}&q=${travelImageCity}`;
  const pixUrlData = await fetch(  imageUrlData);
  try {
      const  imageData = await pixUrlData.json();
      geonamesData['pixCityImage'] =  imageData['hits'][0]['webformatURL'];
      
  } catch (error) {
      console.log(`error: ${error}`)
  }
}
const  userData = geonamesData => {
  console.log(geonamesData)
  
  document.getElementById('my_trip').innerText = `The trip to: ${geonamesData['City']}, ${geonamesData['country']}`;
  document.getElementById('date_leaving').innerText = `is on: ${geonamesData["departureDate"]}`;
  document.getElementById('date_return').innerText = `to return: ${geonamesData["returnDate"]}`;
  document.getElementById('days').innerText = ` The trip is ${daysLeft} days away`;
  document.getElementById('weather').innerText = `The weather will be:${geonamesData['weather']}` ;
  document.getElementById('temp').innerText = `The temperature wil be : ${geonamesData['high_temp']},: ${geonamesData['low_temp']}`;
  document.getElementById('description').innerText = `Mostly ${geonamesData['description']} all through `;
  document.getElementById('image').src = `${geonamesData['pixCityImage']}`;

}

export { handleSubmit };

