import {fetchApiData} from "./data";
// scroll Results into view
//change the letters to capital "australia" to "AUSTRALIA"
import {scroll, capital} from "./helperFunctions";


//the main function
export const main = () => {
  const submit = document.getElementById('generate');
  /* Function called by event listener */
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const detailsTour = validateForm();
    fetchApiData(detailsTour).then((data) => {
      updateUI(detailsTour, data);
    });
  });
}

// To update the UI and generate the country 
const updateUI =  (tourData, rspObj) => {
  const resultView = document.getElementById('displayResult');
  resultView.innerHTML = `
    <div id="entry">
    <h2>Your trip to: ${capital(tourData.destination)}</h2>
    <div class="all">              
        <img src="${rspObj.imageData.hits[0].largeImageURL}" alt="${capital(tourData.destination)}">
        <div class="subDiv">
            <div class="tripDetail">
                <p><span>The trip starts from:</span><span class="c1"> ${tourData.departureD}</span><span> To: </span> <span class="c1">${tourData.arrivalD}</span></p>
                <p><span>Last:</span><span class="c1"> ${rspObj.daysLeftBeforeTour} </span><span>till you start your memorable journey of </span><span class="c1">${rspObj.durationTour} </span><span>days</span></p>
            </div>
            <div class="destDetail">
                <h3 class ="subtitle">Destination Details: </h3>
                <p><span>Temperature:</span> <span class="c1">${rspObj.temperature} </span></p>
                <p><span>Weather description:</span><span class="c1"> ${rspObj.weatherDescription}</span></p>    
                <p><span>Sunrise:</span> <span class="c1">${rspObj.sunrise} </span></p>
                <p><span>Sunset:</span> <span class="c1">${rspObj.sunset}</span></p>    
            </div>
        </div>
    </div>
   </div>
`;
  scroll();
};

/* Function to GET Web API Data*/
const validateForm = () => {
    const destination = document.getElementById('destination');
    const departureD = document.getElementById('departure-d');
    const arrivalD = document.getElementById('arrival-d');
    return {
        destination: destination.value,
        departureD: departureD.value,
        arrivalD: arrivalD.value
    }
}

export { validateForm };

