/* Global Variables */
 
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL= 'https://api.openweathermap.org/data/2.5/weather?'
let apiKey = '0f158dfb22b70b189a48a1e8a09deac0';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performForecast);
/* Function called by event listener */
function performForecast(e){
    const newZip = document.getElementById('zip').value;
    console.log(newZip)
    getWeatherData(baseURL,newZip,apiKey)
    .then(function(data){
        console.log(data.main.temp)
        const temp = data.main.temp;
        const date = currentDate;
        const userResponse = document.getElementById('feelings').value;
        projectData('http://localhost:8000/all', {temperature:temp, date:date, userResponse:userResponse})
        .then(function(newData){
            console.log(newData)
            retrieveWeatherData('http://localhost:8000/all')
            .then(function(data){
                document.getElementById("date").innerHTML = data.date;
                document.getElementById("temp").innerHTML = data.temperature.toString();
                document.getElementById("content").innerHTML = data.userResponse;
            })
            
        }) 
    })
}
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+'zip='+zip+',us&appid='+key)
        try{
            const data = await res.json();
            // console.log(data.main.temp)
            // const temp = data.main.temp
            // const date = currentDate
            // const userResponse = document.getElementById('feelings').value
            // projectData('http://localhost:8000/all', {temperature:temp, date:date, userResponse:userResponse}) 
            return data;
        }catch (error){
            console.log("error", error)
        }

    
}    
// Function to POST data
const projectData = async (url = '', data = {})=>{
        // console.log(data) 
    const response = await fetch(url, {
            method: 'POST', // GET, POST, DELETE, PUT, etc
            credentials: 'same-origin', // include, same origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), //body data type must match "Content-Type" header
        })

        try {
            const newData = await response;
            console.log(newData);
            return newData
        }catch(error) {
            console.log("error", error);
            // appropriately handle the error
        };

};
// Function to GET Project Data 
const retrieveWeatherData = async (url = '') =>{
    const request = await fetch(url);
    try{
        // Transform to json
    const allWeather = await request.json();
    console.log(allWeather)
    return allWeather
    }
    catch (error){
        console.log("error", error);
    }
}
