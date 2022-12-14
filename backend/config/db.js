const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI
    mongoose.set('strictQuery', false)
    mongoose.connect(uri)
    const connection = mongoose.connection
    connection.once('open', () => {
      console.log(
        `MongoDB connection established: ${connection.host}`.cyan.underline,
      )
    })
    // const conn = await mongoose.connect(process.env.MONGO_URI)
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
