/*Global Variables*/
import { checkForName } from "./travelCheck";

const geoUsername = "apinkebello";
// const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;
// const pixAPIKey = "20878180-a358efec6a521e8223bbd10f1";
// const   imageUrlData = `https://pixabay.com/api/?key=${pixAPIKey}&q=${city}&imagetype=photo`;
// const weatherAPIKey = "b4e06de07c5d4a00b2ffb49f7a0536c3";
// const WeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
const geoResults = {};

// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const timestamp = currentDate
const timestampNow = (Date.now()) / 1000
const daysLeft = Math.round((timestamp - timestampNow)/86400);
// let timestamp = new Date(startDate).getTime() / 1000;
// Function to validate input Text

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
  // check what text was put into the form field
  // let isValidated = checkForName(cityGoing,  cityLeaving);
  //   if (isValidated === true) {

      //  geonamesData(cityGoing);

  //   } else {
  //     alert("!please enter a valid city");
  //   }
}
const geonamesData = async city => {
  // const apiURL = 'http://api.geonames.org/searchJSON?q=Berlin&maxRows=10&fuzzy=0&username=nt_muhammedy';
  const apiURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;

  const geoResponse = await fetch(apiURL);
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
const travelWeather = async geoData => {
  const lat = await geoData["lat"];
  const lon = await geoData["long"];
  const travelAPIKey = "b4e06de07c5d4a00b2ffb49f7a0536c3";
  // const WeatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const WeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
  const travelWeatherData = await fetch(WeatherURL);
  try {
      const travelResult = await travelWeatherData.json();
      geoData['high_temp'] = travelResult['data'][0]['high_temp'];
      geoData['low_temp'] = travelResult['data'][0]['low_temp'];
      geoData['description'] = travelResult['data'][0]['weather']['description']
      
  } catch (error) {
      console.log(`error: ${error}`)
  }
}
const travelImage = async geoData => {
  const travelImageCity = geoData['City'];
  const pixAPIKey = '20878180-a358efec6a521e8223bbd10f1';
  const   imageUrlData = `https://pixabay.com/api/?key=${pixAPIKey}&q=${travelImageCity}`;
  const pixUrlData = await fetch(  imageUrlData);
  try {
      const  imageData = await pixUrlData.json();
      geoData['pixCityImage'] =  imageData['hits'][0]['webformatURL'];
      
  } catch (error) {
      console.log(`error: ${error}`)
  }
}
const  userData = geoData => {
  console.log(geoData)
  
  document.getElementById('my_trip').innerText = `The trip to: ${geoData['City']}, ${geoData['country']}`;
  document.getElementById('date_leaving').innerText = `is on: ${geoResults["departureDate"]}`;
  document.getElementById('date_return').innerText = `to return: ${geoResults["returnDate"]}`;
  document.getElementById('days').innerText = ` The trip is ${daysLeft} days away`;
  document.getElementById('weather').innerText = `The weather will be:${geoData['weather']}` ;
  document.getElementById('temp').innerText = `The temperature wil be : ${geoData['high_temp']},: ${geoData['low_temp']}`;
  document.getElementById('description').innerText = `Mostly ${geoData['description']} all through `;
  document.getElementById('image').src = `${geoData['pixCityImage']}`;

}
export { handleSubmit };

