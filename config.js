require('dotenv').config()

const config = {
    mongoURI : process.env.MONGO_URI_TEST,
    port : process.env.PORT || 3001
}

module.exports = config