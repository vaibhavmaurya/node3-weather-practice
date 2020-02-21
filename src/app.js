const path = require('path');
const express = require('express');

const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');

const app = express();

// console.log(__dirname);
// console.log(__filename);

//path module
// console.log(path.join(__dirname, '../public'));

// configure express or customize server
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));


// in case of static express, this is not used
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!!</h1>');
// });

// Now Static pages are loaded

// app.get('/help', (req, res) => {
//     res.send('Helps is always there !!');
// });

// app.get('/about', (req, res) => {
//     res.send('<title>Weather Report</title><h1>Tell weather forecast</h1>');
// });

const getTodaysWeatherReport = (sPlace) => {

    if(!sPlace){
        console.log('Provide address to get wheather report');
        return;
    }

    geocoding.getLatLong(sPlace, ({lat, long}) => {
        forecast(lat, long, ({summary, temperature, rainForecast}) => {
            console.log(summary + ' It is currently '+temperature+
                       ' degrees. And there is a '+rainForecast+
                       '% chance of rain');
        });
    });
};

app.get('/weather', (req, res) => {

    const sPlace = req.query.address;

    if(!req.query.address){
        return res.send({
            error : 'Address must not be empty!'
        });
    }
    geocoding.getLatLong(sPlace, ({lat, long, placeName, error} = {}) => {
        console.log('getLatLong error is ', error);
        if(error){
            return res.send({
                error : error
            });
        }
        forecast(lat, long, ({summary, temperature, rainForecast, error} = {}) => {
            if(error){
                return res.send({
                    error : error
                });
            }
            res.send({
                summary,
                temperature,
                rainForecast,
                placeName
            });
        });
    });
});

app.get('/products', (req, res) => {

    //optional and mandatory queries
    if(!req.query.search){
        return res.send({
            error : 'You must provide search query'
        });
    }
    console.log(req.query);
    res.send({
        products : []
    });
});

app.listen(3000, () => {
    console.log('Server is up !!');
});