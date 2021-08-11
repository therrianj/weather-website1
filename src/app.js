const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//define path fdor excpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup hbs and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
//setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jon'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Jon'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Help page text here',
        title: 'Help',
        name: 'Jon'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })

    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
          })
    })
    
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Jon'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Jon'
    })
})

// app.com
//app.com/help
//app.com/about
//multiple routes

app.listen(3000, () => {
    console.log('server is up on port 3000')
})

