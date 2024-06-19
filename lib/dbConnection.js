const mongoose = require("mongoose")
const env = require("dotenv").config();


//"mongodb+srv://kabugu:yunusu02@cluster0.n50lgm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectionDb = async() =>  {
    //process.env.CONNECTION_STRING
    try {
        const connect = mongoose.connect(process.env.CONNECTION_STRING)
        console.log("db connected to",
         (await connect).connection.host, 
         (await connect).connection.name)
    } catch (error) {
          console.log(error)
    }
}

module.exports = connectionDb