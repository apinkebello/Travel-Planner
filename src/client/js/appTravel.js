/*Global Variables*/

const geoUsername = "apinkebello";
const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;
const pixAPIKey = '20878180-a358efec6a521e8223bbd10f1'
const travelImageURL = `https://pixabay.com/api/?key=${pixAPIKey}&q=${city}&imagetype=photo`;
const travelAPIKey = 'b4e06de07c5d4a00b2ffb49f7a0536c3'
// const travelWeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
const geoResults = {};
const travelWeatherResult = {};
const result = document.querySelector("#result");
const planner = document.querySelector("#planner");
const addTripButton = document.querySelector(".map_link");
const printButton = document.querySelector("#save");
const deleteButton = document.querySelector("#delete");
const form = document.querySelector("#form");
const leaveCity = document.querySelector('input [name="from"]');
const goingCity = document.querySelector('input [name="to"]');
const departDate = document.querySelector('input [name="date"]'); 
const timestampNow = (Date.now()) / 1000;
// const geoReturns = {}

// import { response } from "express";
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event Listeners

// To add  Travel buttons
// const addTripEventList = addTripButton.addEventListener('click',function (event) {
//   event.preventDefault();
//   planner.scrollIntoView({ behavior: 'smooth' });
// })



// To submit a form
// form.addEventListener('submit', addTrip);
//  To print
// printButton.addEventListener('click', function(event){
//   window.print()
//   location.reload();
// })

// // To delete a trip
// deleteButton.addEventListener('click', function(event){
//   form.reset();
//   result.classList.add("invisible");
//   location.reload();
// })

// Function to validate input Text


//  Function called once form is submitted these values are inputed

function handleSubmit(event) {
  event.preventDefault();

  // Input Travel dates (Leaving Dates, return Dates, Destination)
  let cityGoing = document.getElementById("city").value;
  let startDate = document.getElementById("date_leaving").value;
  let retDate = document.getElementById("date_return").value;
  let cityLeaving = document.getElementById("city_leave").value;
  // let leaveCity = document.getElementById("city_leave").value
  let timestamp = (new Date(startDate).getTime()) / 1000

  // check what text was put into the form field

  // let isValidated = checkForName(locCity, startDate, retDate);

  // if (isValidated === true) {
  //  const geoReturns =  geonamesData(locCity);
   
    
  // } else {
  //   alert("!please enter a valid date");
  // }

  // console.log("::: Form Submitted :::");
  // console.log(locCity);
  // console.log(startDate);
  // console.log(retDate);

  Client.checkForName(cityGoing, cityLeaving)
  // const geoResults = geonamesData(baseURL)
  
  // // /  Function geonamesData to get city information from Geonames (latitude, longitude, country)
  // const geonamesData = async (baseURL) => {
  //   // res is the result of the fetch function
  //   const res = await fetch (baseURL);
  //   try{
  //     const geoAPIjson = await res.json();
  //     return geoAPIjson;
  //   }catch (error){
  //   console.log('error', error);
  // }}

  const geoResults = geonamesData()
  .then((geoAPIdata) => {
    geoResults["country"] = geoAPIjson["geonames"][0]["countryName"];
    geoResults["cityname"] = geoAPIjson["geonames"][0]["toponymName"];
    geoResults["long"] = geoAPIjson["geonames"][0]["lng"];
    geoResults["lat"] = geoAPIjson["geonames"][0]["lat"];
    console.log(geoResults);
    const lonCity = geoResults["long"]
    const latCity = geoResults["lat"]
    const country = geoResults["country"]
    const travelWeatherResult = travelWeather(lonCity, latCity, country, timestamp)
    return travelWeatherResult; 
  })
    .then((geoAPIdata) => {
      const daysLeft = Math.round((timestamp - timestampNow)/86400);
      const userData = postData('http://localhost/8080/add', {cityLeaving, cityGoing, startDate, weather:geoAPIdata.currently.temperature, 
      summary:geoAPIdata.currently.summary, daysLeft})
      return userData;
    }).then((userData) => {
      updateUI(userData)
    })
    
  //  Function geonamesData to get city information from Geonames (latitude, longitude, country)
  // const geonamesData = async (baseURL) => {
  //   // res is the result of the fetch function
  //   const res = await fetch (baseURL);
  //   try{
  //     const geoAPIjson = await res.json();
  //     return geoAPIjson;
  //   }catch (error){
  //   console.log('error', error);
  // }}


  // function geonamesData to get weather data from Weatherbit API
 const travelWeather = async (lonCity, latCity, country, timestamp) => {
    const travelWeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
    const req = await fetch(travelWeatherURL)
    try{
      const travelWeatherResult = await req.json();
      return travelWeatherResult;
    }catch (error){
      console.log('error', error);
    }}
    

    // function postData to POST data on the local server
   const postData = async (url = '', data = {}) =>{
      const req = await fetch(url, {
        method: "POST",
        credentials: "same origin",
        headers:{
          "Content-Type": "application/json;charset=UTF-8"
        },
        body:JSON.stringify({
          leaveCity: data.cityLeaving,
          goingCity: data.cityGoing,
          departDate: data.startDate,
          weather: data.weather,
          summary: data.summary,
          daysLeft: data.daysLeft


        })

      })
      try {
        const userData = await req.json();
        return userData;
      }catch (error) {
        console.log("error", error);
      }

    }

  //  Function to update UI showing the destination and the trip information
  const updateUI = async (userData) => {
    result.classList.remove("invisible");
    result.scrollIntoView({behavior: "smooth"});

    const res = await fetch (travelImageURL);
    try{
      const imageLink = await res.json();
      const daySplit = userData.departDate.split("-").reverse().join(" / ");
      document.querySelector("#city").innerHTML = userData.cityGoing
      document.querySelector("#date").innerHTML = dateSplit;
      document.querySelector("#days").innerHTML = userData.daysLeft
      document.querySelector("#summary").innerHTML = userData.summary;
      document.querySelector("#temp").innerHTML = userData.weather
      document.querySelector("#fromPixabay").setAttributes('src', imageLink.hits[0].webformatURL);
    }
    catch (error){
      console.log("error", error)
    }
  }

  

// const geonamesData = async (city) => {
//   const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;
//   console.log(baseURL)
//   const geoAPIdata = await fetch(baseURL);
//   try {
//     const geoAPIjson = await geoAPIdata.json();
    
//     geoResults["country"] = geoAPIjson["geonames"][0]["countryName"];
//     geoResults["cityname"] = geoAPIjson["geonames"][0]["toponymName"];
//     geoResults["long"] = geoAPIjson["geonames"][0]["lng"];
//     geoResults["lat"] = geoAPIjson["geonames"][0]["lat"];
//     console.log(geoResults);
//     const lonCity = geoResults["long"]
//     const latCity = geoResults["lat"]
//     const country = geoResults["country"]
//     const travelWeatherResult = travelWeather(lonCity, latCity, country)
//     // let lon = geoResults["long"]
//     // let lat = geoResults["lat"]
    
//     return travelWeatherResult; 
//   } catch (error) {
//     console.log(error);
//   }
// };


// const pixAPIKey = '20878180-a358efec6a521e8223bbd10f1'
// const travelImage = async (city) => {
// const travelImageURL = `https://pixabay.com/api/?key=${pixAPIKey}&q=${city}&imagetype=photo`;
// console.log(travelImageURL)
// const travelImageData = await fetch(travelImageURL);
// try{
//   const travelImagejson = await travelImageData.json();
//   console.log(travelWeatherResult);
//   return travelWeatherResult   
// }catch (error) {
//   console.log(error)
// }

// }

// // let lon = geoResults["long"]
// // let lat = geoResults["lat"]
// const travelAPIKey = 'b4e06de07c5d4a00b2ffb49f7a0536c3'
// console.log(lon, lat)
// const travelWeather = async (lon, lat) => {

//   const travelWeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${travelAPIKey}`;
//   console.log(travelWeatherURL)
//   const travelWeatherData = await fetch(travelWeatherURL);
//   try{
//     const travelWeatherjson = await travelWeatherData.json();
//     console.log(travelWeatherResult);
//     return travelWeatherResult
//   }catch (error) {
//     console.log(error)
//   }
// }



// function checkForName(inputText, start_Date, return_Date) {
//   console.log(
//     "::: Running checkForName :::",
//     inputText,
//     start_Date,
//     return_Date
//   );
//   console.log(inputText, start_Date, return_Date);
//   is_StartDateValid(start_Date);
//   is_ReturnDatevalid(return_Date);
//   // To combine the 2 trues from the three checks
//   let isValidated = true;
//   isValidated =
//     is_StartDateValid(start_Date) && is_ReturnDatevalid(return_Date);

//   return isValidated;
// }

// // startDate is equal or greater than current currentDate .Is start Date valid?
// function is_StartDateValid(value) {
//   let now = new Date();

//   let startDate = new Date(value);

//   if (startDate.getFullYear() > now.getFullYear()) {
//     return true;
//   } else if (startDate.getFullYear() == now.getFullYear()) {
//     if (startDate.getMonth() > now.getMonth()) {
//       return true;
//     } else if (startDate.getMonth() == now.getMonth()) {
//       if (startDate.getDate() >= now.getDate()) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   } else {
//     return false;
//   }
//   console.log(is_StartDateValid(value));
// }

// // // retDate is equal or grater than startDate. Is Return date valid?
// function is_ReturnDatevalid(value) {
//   let startDate = new Date();
//   let retDate = new Date(value);

//   if (retDate.getFullYear() > startDate.getFullYear()) {
//     return true;
//   } else if (retDate.getFullYear() == startDate.getFullYear()) {
//     if (retDate.getMonth() > startDate.getMonth()) {
//       return true;
//     } else if (retDate.getMonth() == startDate.getMonth()) {
//       if (retDate.getDate() >= startDate.getDate()) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   } else {
//     return false;
//   }
//   console.log(s_ReturnDatevalid(value));
// }

// export { checkForName };
}
export { handleSubmit }

// export { addTripEventList }
