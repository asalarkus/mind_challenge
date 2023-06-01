const { config }  = require('dotenv');
const path =  `${process.env.NODE_ENV}.env`;
config({ path });
console.log("🚀 ~ file: config.js:4 ~ path:", path)

/**
 * Config file to export enviroment variables to server.
 */
module.exports = {
    ENV: process.env.ENV,
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION,
    MONGO_ATLAS_USERNAME: process.env.MONGO_ATLAS_USERNAME,
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD,
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI
}
