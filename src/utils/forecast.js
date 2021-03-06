const request = require('request')
const chalk = require('chalk')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=09840bba4ee0cd3ad525e71a1589924e&query=' + longitude + ',' + latitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(chalk.inverse.red('Unable to connect to weather service.'), undefined)
        } else if (body.error) {
            callback(chalk.red.inverse('Unable to find location'), undefined)
        } else{
            const {weather_descriptions, temperature, feelslike, wind_speed, humidity} = body.current
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees Celsius and feels like ' + feelslike + ' degrees Celsius. The wind speed is currently: ' + wind_speed + 'km/hr and the humidity is at ' + humidity + '%.' )
            }
        }

    
    )}




module.exports = forecast

