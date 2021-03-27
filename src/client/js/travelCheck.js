      const checkForName = (cityGoing, cityLeaving)  => {
        console.log("::: Running checkForName :::", cityGoing, cityLeaving);
        let isText = checkInputText(cityGoing, cityLeaving)


        return isText;
      }
//     
//     console.log(inputText, start_Date, return_Date)
//     is_StartDateValid(start_Date)
//     is_ReturnDatevalid(return_Date)
//     // To combine the 3 trues from the three checks 
//     let isValidated = true;
//     isValidated = is_StartDateValid(start_Date) && is_ReturnDatevalid(return_Date);

//     return isValidated;
// }


function checkInputText(cityGoing, cityLeaving) {
    let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (urlRGEX.test(cityGoing) && urlRGEX.test(cityLeaving)) {
      return
    } else {
      alert("please enter a valid name");
    }
  }
  
  

 

  

// // startDate is equal or greater than current currentDate .Is start Date valid?
// function is_StartDateValid(value) 
//     {    
//     let now = new Date;
    
//     let startDate  = new Date(value);
    
//     if (startDate.getFullYear() > now.getFullYear()) 
//     {
//         return true;
//     }
//     else if(startDate.getFullYear() == now.getFullYear()) 
//     {
//     if (startDate.getMonth() > now.getMonth()) {
//     return true;
//     } 
//     else if(startDate.getMonth() == now.getMonth())
//     {
//     if (startDate.getDate() >= now.getDate()) {
//         return true;
//     }
//     else
//     {
//         return false
//     }
//     }
//     }

//    else{
//     return false;
//     }
//     console.log (is_StartDateValid(value))
// }  


// // // retDate is equal or grater than startDate. Is Return date valid?
// function is_ReturnDatevalid(value) 
//     {    
//     let startDate = new Date;
//     let retDate  = new Date(value);
    

//     if (retDate.getFullYear() > startDate.getFullYear()) 
//     {
//         return true;
//     }
//     else if(retDate.getFullYear() == startDate.getFullYear()) 
//     {
//     if (retDate.getMonth() > startDate.getMonth()) {
//     return true;
//     } 
//     else if(retDate.getMonth() == startDate.getMonth())
//     {
//     if (retDate.getDate() >= startDate.getDate()) {
//         return true;
//     }
//     else
//     {
//         return false
//     }
//     }


//     }

//    else{
//     return false;
//     }
//     console.log(s_ReturnDatevalid(value))
// }

// export { checkForName }
export { checkForName }
// export { checkInputText }
