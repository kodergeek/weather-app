const request = require('request')

const forecast = ( latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=YOUR_API_KEY_HERE&query=' + latitude + ',' + longitude

    request({
    url, json: true},
    (error, {body}) => {  //getting body directly from response object using es6 syntax obj destructuring
       // console.log(response.body.current)
       console.log(body.success)
       if (error) {
           console.log(error)
           callback ('got error from weatherstack')
       }
       else if (body.success === false) {
           console.log('probably a cordinate error')
       }
       else {
           console.log('-------------')
           //console.log(body)
           callback(undefined, 'current temp: ' + body.current.temperature + ', ' + body.current.weather_descriptions)
       }
    })


}

module.exports = forecast