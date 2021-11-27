const request = require("request")

const forecast = (latitude, longitude, callback)=>{
    const url="http://api.weatherapi.com/v1/forecast.json?key=6d65da694ccd4a808e8104617212211&q="+latitude+","+longitude + "&days=1&aqi=yes&alerts=yes"
    // request({ url: url, json:true},(error,{response})=>{
        request({ url, json:true},(error,{body})=>{
            if (error){
                callback("Unable to connect to weather service!!",undefined)
            // console.log("Unable to connect to weather service!!")
            } else if (body.error){
                callback(body.error.message,undefined)
            //  console.log(response.body.error.message)
            } else {
                callback(undefined,body.current.condition.text+". it is currently " +body.current.temp_c +" degrees out. there is a "+body.current.precip_mm+"% chance of rain")
                // console.log(response.body.current.condition.text+". it is currently " +response.body.current.temp_c +" degrees out. there is a "+response.body.current.precip_mm)
            }
})
}

module.exports = forecast