const request = require('request')
const geocode = (address,callback) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmFyYXRoMjciLCJhIjoiY2t3YzBwOGNhMXN5NDJ3cGFldDM3MnRxbiJ9.gduV8UVrvH7Nhi5cxpyf7A&limit=1"

    // request({ url:url, json:true},(error, response)=>{
    request({ url, json:true},(error, {body})=>{
        if (error){

            callback("unable to connect to location service", undefined)
                // latitude: undefined,
                // longitude: undefined,
                // location: undefined})
        }else if (body.features.length === 0) {
            callback("unable to find location. try another location search",undefined)
            // {
                // latitude: undefined,
                // longitude: undefined,
                // location: undefined})
        } else {
            callback( undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode