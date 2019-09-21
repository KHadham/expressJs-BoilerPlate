require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')

const port = process.env.PORT || 5000

const postRoute = require('./src/routes/postingan')
const noteRoute = require('./src/routes/user')


app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
})

//virtual folder
app.use('/uploads', express.static(__dirname + '/uploads'))

// app.use(cors())
app.use(xssFilter())
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//router

app.use('/post', postRoute)
app.use('/note', noteRoute)
