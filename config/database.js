const mongoose = require("mongoose");


async function dbConnection () {
    try {
        const database_connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log("database connection established")
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = dbConnection