// import { is_StartDateValid } from 'src/client/js/travelChecks'
let startDate  = new Date(value);
let startDate = document.getElementById("date_leaving").value;


function getDayRemaining(startDate){
    const dayLeft = Date.parse(startDate) - Date.parse(new Date());
    // const seconds = Math.floor( (total/1000) % 60 );
    // const minutes = Math.floor( (total/1000/60) % 60 );
    // const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    
    return {
      dayLeft,
      days
    };

    getDayRemaining(startDate)
  }

  export { getTimeRemaining }

  let startDate = document.getElementById("date_leaving").value;
  let timeLeft 