/*
Get Address to Lat/Long (Geocoding)
example : "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmFpYmhhdi1zZW5zZSIsImEiOiJjazZycHV5YmMwN3dnM29udjVyd2t2dXZyIn0.lJYpHHMi7iF1Zl3WNPEnJQ"

*/

const request = require('request');


const service_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const access_token_query = 'access_token=pk.eyJ1IjoidmFpYmhhdi1zZW5zZSIsImEiOiJjazZycHV5YmMwN3dnM29udjVyd2t2dXZyIn0.lJYpHHMi7iF1Zl3WNPEnJQ';


const getLatLong = (search_query, callBack) => {

    // encodeURIComponent('hello there')
    const url = service_url + encodeURIComponent(search_query) + '.json?' + access_token_query + '&limit=1';

    request({
        url,
        json : true
    }, (error, {body} = {}) => {
        if(error){
            console.log('Unable to connect MAP API !!');
            callBack({
                error : 'Unable to connect MAP API !!'
            });
        }else if(body.message){
            console.log(body.message);
            callBack({
                error : body.message
            });
        }else{

            if(body.features.length === 0){
                console.log('No Lat Long for '+search_query);
                callBack({
                    error : 'No Lat Long for '+search_query
                });
            }else{
                const coordinates = body.features[0].geometry.coordinates.reverse();
                // console.log(response);

                const lat = coordinates[0];
                const long = coordinates[1];
                const placeName = body.features[0].place_name;

                console.log(search_query+': '+coordinates);
                console.log('Place name: '+placeName);

                callBack({
                    lat,
                    long,
                    placeName
                });
            }
        }
    });

};


module.exports = {
    getLatLong : getLatLong
};