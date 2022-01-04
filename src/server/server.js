require('dotenv').config();
// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express= require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const geonamesBaseURL = process.env.GEONAMES_BASE_URL;
const port = process.env.PORT || 8100;
const fetch = require('node-fetch');
const app=express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));// to support URL-encoded bodies
app.use(bodyParser.json());// to support JSON-encoded bodies

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', (req, res) =>{
    res.sendFile(path.resolve('dist/index.html'))
});

app.post('/getDestination', async (req, res)=>{
       const username = process.env.GEONAMES_USERNAME;
       console.log(username);

        const fetchGeoURL =  await fetch (`${geonamesBaseURL}=${req.body.destination}&maxRows=1&username=${username}`);
        console.log(fetchGeoURL);
    try {
        const data = await fetchGeoURL.json();
        console.log(data);

        res.send(data);
    } catch (error) {
        console.log({"Error in getDestination": error})
    }
});


app.post('/getWeather', async(req, res) =>{
    const weatherApiKey = process.env.WEATHER_APIKEY;
    console.log(weatherApiKey);
    let weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${req.body.latitude}&lon=${req.body.longitude}&key=${weatherApiKey}`;
    const response = await fetch(weatherUrl)
    try {
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post('/getImage', async(req, res) =>{
    const landingPlace = req.body.destination.replace(/\s/g, '+');
    const landingCountry = req.body.country.replace(/\s/g, '+');
    const pixabayApiKey = process.env.PIXABAY_APIKEY

    // Fetch data from Pixabay API
    let picOne = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${landingCountry}&image_type=photo`);
    try {
        let data = await picOne.json();
        if (data.totalHits > 0) {
            res.send(data);
        } else {
            try {
                let picTwo = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${landingCountry}&image_type=photo`);
                let data = await picTwo.json();
                res.send(data)
            } catch (error) {
                console.log({"Error in getImage pictwo":error});
                res.send({});
            }
        }
    } catch (error) {
        console.log({"Error in getImage picOne":error});
        res.send({});
    }
});

app.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
});
