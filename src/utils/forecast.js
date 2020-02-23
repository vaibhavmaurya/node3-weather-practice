
request = require('request');

const forecast = (lat, long, callBack) => {

    const service_url = 'https://api.darksky.net/forecast/1b425dbe6a4de8c2d3c5dfa459819aff/';
    const unit = 'units=si';
    const url = service_url + [lat, long].join(',') + '?' + unit;


    request({
        url,
        json : true
    }, (error, {body} = {}) => {
        //response break down to body
        if(error){
            console.log('Unable to connect weather API!!');
            callBack({
                error : 'Unable to connect weather API!!'
            });
    
        }else if(body.error){
            callBack({
                error : body.error
            });
            console.log(body.error);
    
        }else{
            callBack({
                summary : body.currently.summary,
                temperature : body.currently.temperature,
                rainForecast : body.currently.precipProbability * 100,
                temperatureLow : body.daily.data[0].temperatureLow,
                temperatureHigh : body.daily.data[0].temperatureHigh
            });
        }
    });
};


module.exports = forecast;