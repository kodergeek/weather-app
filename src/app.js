const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

//define paths for express condig
const static_folder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars, engine, and view location
app.set('view engine', 'hbs') //use handle bars templating engine
app.set('views', viewsPath)
app.use(express.static(static_folder))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sina'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Sina'
    })
} )

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'})
    }

    //debugger
    //now get the location weather for the given location
    var cityInfo = undefined
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error}) 
        }
        
        forecast(latitude, longitude , (error, weather) => {

            if (error) {
               return res.send(error)
            }
            res.send({
                location,
                forecast: weather,
                address: req.query.address})
        })
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Sinak',
        helpText: 'this page is created to help you get started usung our app'
    })
} )

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help not fonud',
        name: 'Sinak',
        header: '404 - not found',
        errorMessage: 'We are sorry, but the HELP article requested was not found '
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'not fonud',
        name: 'Sinak',
        header: '404 - not found',
        errorMessage: 'We are sorry, but the page you requested was not found '
    })
})

app.listen(port, () => {
    console.log('server is up on port '+ port)
})