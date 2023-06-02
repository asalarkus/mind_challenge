const { config }  = require('dotenv');
const path =  `${process.env.NODE_ENV}.env`;
config({ path });
console.log("🚀 ~ file: config.js:4 ~ path:", path)

/**
 * Config file to export enviroment variables to server.
 */
module.exports = { 
    ENV: process.env.ENV, //NodeJS Enviroment DEV o PROD
    PORT: process.env.PORT || 3000, //Server running port
    DOMAIN: process.env.DOMAIN, //Production domain
    VERSION: process.env.VERSION, //API Version
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI, // Mongo Atlas URL Database Connection
    SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY //JWT SERCRET KEY to sign token
}
