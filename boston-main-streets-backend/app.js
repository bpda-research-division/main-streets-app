const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
require('express-async-errors')
// controllers
const mapRouter = require('./controllers/mapRouter')
const businessRouter = require('./controllers/businessRouter')
const dataRouter = require('./controllers/dataRouter')
var bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api/map', mapRouter)
app.use('/api/business', businessRouter)
app.use('/api/data', dataRouter)
// An update

app.get('/*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'), (error) => {
        res.status(500).send(error)
    })
})

module.exports = app