/*Global Variables*/

const geoUsername = "apinkebello";
const geoResults = {};
const travelWeatherResult = {};


// import { response } from "express";
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//  Once these values are inputed

function handleSubmit(event) {
  event.preventDefault();

  // Input Travel dates (Leaving Dates, return Dates, Destination)
  let locCity = document.getElementById("city").value;
  let startDate = document.getElementById("date_leaving").value;
  let retDate = document.getElementById("date_return").value;

  // check what text was put into the form field

  let isValidated = checkForName(locCity, startDate, retDate);

  if (isValidated === true) {
   const geoReturns =  geonamesData(locCity);
   
    
  } else {
    alert("!please enter a valid date");
  }

  console.log("::: Form Submitted :::");
  console.log(locCity);
  console.log(startDate);
  console.log(retDate);
}

const geonamesData = async (city) => {
  const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;
  console.log(baseURL)
  const geoAPIdata = await fetch(baseURL);
  try {
    const geoAPIjson = await geoAPIdata.json();
    
    geoResults["country"] = geoAPIjson["geonames"][0]["countryName"];
    geoResults["cityname"] = geoAPIjson["geonames"][0]["toponymName"];
    geoResults["long"] = geoAPIjson["geonames"][0]["lng"];
    geoResults["lat"] = geoAPIjson["geonames"][0]["lat"];
    console.log(geoResults);
    let lon = geoResults["long"]
    let lat = geoResults["lat"]
    travelWeather(lon, lat)
    return geoResults
  } catch (error) {
    console.log(error);
  }
};

// let lon = geoResults["long"]
// let lat = geoResults["lat"]
const travelAPIKey = 'b4e06de07c5d4a00b2ffb49f7a0536c3'
console.log(lon, lat)
const travelWeather = async (lon, lat) => {

  const travelWeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
  console.log(travelWeatherURL)
  const travelWeatherData = await fetch(travelWeatherURL);
  try{
    const travelWeatherjson = await travelWeatherData.json();
    console.log(travelWeatherResult);
    return travelWeatherResult
  }catch (error) {
    console.log(error)
  }
}




const pixAPIKey = '20878180-a358efec6a521e8223bbd10f1'
const travelImage = async (city) => {
const travelImageURL = `https://pixabay.com/api/?key=${pixAPIKey}&q=${city}`;
console.log(travelImageURL)
const travelImageData = await fetch(travelImageURL);
try{
  const travelImagejson = await travelImageData.json();
  console.log(travelWeatherResult);
  return travelWeatherResult   
}catch (error) {
  console.log(error)
}

}


// https://pixabay.com/api/?Key=20878180-a358efec6a521e8223bbd10f1&q=London
//  country: "United Kingdom", cityname: "London", long: "-0.12574", lat: "51.50853"

function checkForName(inputText, start_Date, return_Date) {
  console.log(
    "::: Running checkForName :::",
    inputText,
    start_Date,
    return_Date
  );
  console.log(inputText, start_Date, return_Date);
  is_StartDateValid(start_Date);
  is_ReturnDatevalid(return_Date);
  // To combine the 2 trues from the three checks
  let isValidated = true;
  isValidated =
    is_StartDateValid(start_Date) && is_ReturnDatevalid(return_Date);

  return isValidated;
}

// startDate is equal or greater than current currentDate .Is start Date valid?
function is_StartDateValid(value) {
  let now = new Date();

  let startDate = new Date(value);

  if (startDate.getFullYear() > now.getFullYear()) {
    return true;
  } else if (startDate.getFullYear() == now.getFullYear()) {
    if (startDate.getMonth() > now.getMonth()) {
      return true;
    } else if (startDate.getMonth() == now.getMonth()) {
      if (startDate.getDate() >= now.getDate()) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
  console.log(is_StartDateValid(value));
}

// // retDate is equal or grater than startDate. Is Return date valid?
function is_ReturnDatevalid(value) {
  let startDate = new Date();
  let retDate = new Date(value);

  if (retDate.getFullYear() > startDate.getFullYear()) {
    return true;
  } else if (retDate.getFullYear() == startDate.getFullYear()) {
    if (retDate.getMonth() > startDate.getMonth()) {
      return true;
    } else if (retDate.getMonth() == startDate.getMonth()) {
      if (retDate.getDate() >= startDate.getDate()) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
  console.log(s_ReturnDatevalid(value));
}

export { checkForName };

export { handleSubmit };
