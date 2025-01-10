require('dotenv').config()

const config = {
    mongoURI : process.env.MONGO_URI_TEST,
    port : 3005
}

module.exports = config