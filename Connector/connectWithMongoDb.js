const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectWithMongoDb = ()=>{
    // console.log(process.env)
    mongoose.connect(process.env.MONGODB_URL).then((response)=>{
        console.log("Succesfully conneted with mongodb")
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports = connectWithMongoDb

