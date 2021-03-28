import { checkForName } from './js/travelCheck'
// import { addTrip } from "./js/appTravel.js"
import { handleSubmit } from './js/appTravel'
// import { addTripEventList } from "./js/appTravel.js"
// import './views/img/travel_img.jpeg'


import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
// import './styles/footer.scss'
// import './styles/header.scss'
// import './styles/navigation.scss'
document.querySelector(".travel").addEventListener('submit', handleSubmit)

// export {
    
//     checkForName,
//     handleSubmit
// }






// export { addTrip }
export { checkForName }
// export { addTripEventList }