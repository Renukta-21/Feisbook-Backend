require('dotenv').config()

const config = {
    mongoURI : process.env.MONGO_URI_TEST,
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret :process.env.API_SECRET,
    port : 3005
}

module.exports = config