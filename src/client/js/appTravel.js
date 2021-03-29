/*Global Variables*/
import { checkForName } from "./travelCheck";

const geoUsername = "apinkebello";
const geoResults = {};
// let daysLeft = 'number of days left to undertake the trip'
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const timestamp = currentDate;
const timestampNow = Date.now() / 1000;
const daysLeft = Math.round((timestamp - timestampNow) / 86400);

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
  geoResults["daysLeft"] = dateDiffInDays(startDate);
  geoResults["tripFor"] = lenghtOfTrip(retDate, startDate);
  geonamesData(cityGoing);
}

const dateDiffInDays = (laterDate) => {
  const firstDate = new Date(new Date().toISOString().slice(0, 10)),
    secondDate = new Date(laterDate);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate()
  );
  const utc2 = Date.UTC(
    secondDate.getFullYear(),
    secondDate.getMonth(),
    secondDate.getDate()
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const lenghtOfTrip = (retDate, startDate) => {
  const endDate = new Date(new Date(retDate).toISOString().slice(0, 10)),
    begDate = new Date(startDate);
  return Math.floor(endDate - begDate) / 1000 / 86400;
};

const geonamesData = async (city) => {
  const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;

  const geoResponse = await fetch(geoURL);
  try {
    const geoResult = await geoResponse.json();
    geoResults["City"] = geoResult["geonames"][0]["toponymName"];
    geoResults["country"] = geoResult["geonames"][0]["countryName"];
    geoResults["long"] = geoResult["geonames"][0]["lng"];
    geoResults["lat"] = geoResult["geonames"][0]["lat"];
    travelWeather(geoResults);
    travelImage(geoResults);
    setTimeout(() => {
      upDateUI(geoResults);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const travelWeather = async (geonamesData) => {
  const lat = await geonamesData["lat"];
  const lon = await geonamesData["long"];
  const travelAPIKey = "b4e06de07c5d4a00b2ffb49f7a0536c3";
  const WeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
  const travelWeatherData = await fetch(WeatherURL);
  try {
    const travelResult = await travelWeatherData.json();
    geoResults["high_temp"] = travelResult["data"][0]["high_temp"];
    geoResults["low_temp"] = travelResult["data"][0]["low_temp"];
    geoResults["description"] =
      travelResult["data"][0]["weather"]["description"];
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
const travelImage = async (geonamesData) => {
  const travelImageCity = geonamesData["City"];
  const pixAPIKey = "20878180-a358efec6a521e8223bbd10f1";
  const imageUrlData = `https://pixabay.com/api/?key=${pixAPIKey}&q=${travelImageCity}`;
  const pixUrlData = await fetch(imageUrlData);
  try {
    const imageData = await pixUrlData.json();
    if (imageData["hits"][0]["webformatURL"]) {
      geoResults["pixCityImage"] = imageData["hits"][0]["webformatURL"];
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

// Function to up display Travel Information
const upDateUI = (geonamesData) => {
  document.getElementById(
    "my_trip"
  ).innerText = `The trip to ${geonamesData["City"]}, ${geonamesData["country"]}`;
  document.getElementById(
    "dateLeaving"
  ).innerText = `is on ${geonamesData["departureDate"]}`;
  document.getElementById(
    "dateReturn"
  ).innerText = `to return ${geonamesData["returnDate"]}.`;
  document.getElementById(
    "days"
  ).innerText = ` The trip is ${geonamesData["daysLeft"]} days away,`;
  document.getElementById(
    "temp"
  ).innerText = `the temperature will be between  ${geonamesData["high_temp"]}C and ${geonamesData["low_temp"]}C.`;
  document.getElementById(
    "description"
  ).innerText = `${geonamesData["description"]} all through. `;
  if (geonamesData["pixCityImage"]) {
    document.getElementById("image").src = `${geonamesData["pixCityImage"]}.`;
  }
  document.getElementById(
    "trip_lenght"
  ).innerText = `This trip is for ${geonamesData["tripFor"]} days.`;
};

export { handleSubmit };
