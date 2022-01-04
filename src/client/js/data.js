import { daysLeftBeforeTour, durationTour } from './helperFunctions';

const baseURL ="http://localhost:8100";

/* Function to fetch API data */
export const fetchApiData = async (tour) => {
      let rspObj = {};
      let rspObjDestination = await fetch(`${baseURL}/getDestination`, {
      method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"destination": tour.destination})
    });
    try{
      let data =  await rspObjDestination.json();
      rspObj.destination = data.geonames[0].countryCode;
      rspObj.countryName = data.geonames[0].countryName;
      rspObj.latitude = data.geonames[0].lat;
      rspObj.longitude = data.geonames[0].lng;
    }catch(error){
      console.log({"error in rspObjDestination_apiData":error});
    }
    // //weather info
     let weatherInfo = await fetch(`${baseURL}/getWeather`, {
        method: 'POST',
         credentials: 'same-origin',
         mode: 'cors',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             "latitude": rspObj.latitude,
             "longitude": rspObj.longitude
         })
     })
     try {
         let weatherData =  await weatherInfo.json();
         console.warn(weatherData);
          rspObj.temperature = weatherData.data[0].temp;
          rspObj.sunrise = weatherData.data[0].sunrise;
          rspObj.sunset = weatherData.data[0].sunset;
          rspObj.weatherDescription = weatherData.data[0].weather.description;
     } catch (error) {
         console.log({"error in weatherInfo_apiData":error});
     }
    // //get image
     let imageDestination = await fetch(`${baseURL}/getImage`, {
     method: 'POST',
         credentials: 'same-origin',
         mode: 'cors',
         headers: {
             'Content-Type': 'application/json',
         },
     body: JSON.stringify({
            "destination": rspObj.destination,
             "country":  rspObj.countryName
         })
     })
     try {
       rspObj.imageData = await imageDestination.json();
       tour.imageURL = data3.imageData.hits[0].largeImageURL;
     } catch (error) {
         console.log({"error in imageDestination_apiData":error});
     }
     rspObj.daysLeftBeforeTour = daysLeftBeforeTour(tour);
     rspObj.durationTour =  durationTour(tour);
    return  rspObj;
}



