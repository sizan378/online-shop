// external imports
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');


// internal imports
const dbConnection = require('./config/database')
const { errorHandler, notFound } = require('./middleware/errorHandler/globalError')
const userRoute = require('./router/user/userRoute')
const productRoute = require('./router/product/productRoute')
const categoryRoute = require('./router/category/categoryRoute')
const brandRoute = require('./router/brand/brandRoute')
const stockRoute = require('./router/stock/stockRoute')


const router = express.Router();
const app = express();

// database configuration
dbConnection()

// request parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// static folder setup
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// router configuration
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/brand', brandRoute)
app.use('/api/v1/stock', stockRoute)


// swagger routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// page not found
app.use(notFound)

// error handling
app.use(errorHandler)

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`)
})



