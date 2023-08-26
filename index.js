// external imports
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');


// internal imports
const dbConnection = require('./config/database')
const { errorHandler, notFound } = require('./middleware/errorHandler/globalError')
const userRoute = require('./router/user/userRoute')
const productRoute = require('./router/product/productRoute')


const router = express.Router();
const app = express();

// database configuration
dbConnection()

// request parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// static folder setup
app.use(express.static(path.join(__dirname, 'public')));

// router configuration
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)


// page not found
app.use(notFound)

// error handling
app.use(errorHandler)

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`)
})



