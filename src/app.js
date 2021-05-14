const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Minjun Kwak"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Minjun Kwak"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: "help text",
        title: "Help",
        name: "Minjun Kwak"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { weather_description, temperature, feelsLike }) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: weather_description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out.',
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMsg: "Help article not found",
        title: "404 page",
        name: "Minjun Kwak"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMsg: "Page not found",
        title: "404 page",
        name: "Minjun Kwak"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})