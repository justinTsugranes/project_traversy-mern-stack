const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5500
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server is running on port ${port}`.blue))
