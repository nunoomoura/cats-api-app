const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*' // TODO: Insert production URL
}))

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/cats', require('./routes/catRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))