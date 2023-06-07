const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('../config');
const swagger_js_doc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');
const { logger, morganMiddleware } = require('../middlewares');
const { dbConnection } = require('../database/config');

const env = config.ENV;
const version = config.VERSION;

let swagger_options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mind`s Challenge API',
            description: 'Mind`s Challenge API Docs',
            termsOfService: 'https://www.framatech.com/policies/privacy-policy',
            version: '0.0.1'
        },
        components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
        },
        security: [{
            bearerAuth: []
        }],
        servers: []
    }, 
    apis: [`${path.join(__dirname, "../routes/*")}`]
};

if (env === 'dev') {
    swagger_options.definition.servers[0] = {
        url: `http://localhost:${config.PORT}/`,
        description: 'Local server'
    }
} else {
    swagger_options.definition.servers[0] = {
        url: config.DOMAIN,
        description: 'Production server'
    }
} 

/**
 * Class server to manage instances.
 */
class Server {
    constructor(){
        /**
         * Init express app instance
         */
        this.app = express();
        /**
         * Using port variable to setup env on server
         */
        this.port = config.PORT;

        this.swagger_docs = swagger_js_doc(swagger_options);

        //Init Server Implementation
        this.server = require('http').createServer(this.app);

        this.paths = {
            index: `/api/${version}/index`,
            swagger: `/api/${version}/docs`,
            users: `/api/${version}/users`,
            auth: `/api/${version}/auth`,
            accounts: `/api/${version}/accounts`
        }

        //Connect to database
        this.dbConnect();

        /**
         * Setup configuration of middlewares for express
         */
        //Middlewares
        this.middlewares();

        /**
         * Setup configuration for routes on server instance
         */
        //Application routes
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    /**
     * Middlewares method to setup all packages using on project.
     */
    middlewares(){

        //Parse and reading body
        this.app.use(express.json());

        //CORS
        this.app.use( cors() );
        
        //public folder expose
        this.app.use( express.static('public') );

        //Routing morgan middleware+
        this.app.use(morganMiddleware);

    }

    /**
     * Exposing routes on server.
     */
    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.swagger, swagger_ui.serve, swagger_ui.setup(this.swagger_docs, swagger_options));
        this.app.use(this.paths.index, require('../routes/index'));
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.accounts, require('../routes/accounts'));
    }

    /**
     * Listen method to instance express app and run server on port.
     */
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server running on port ", this.port);
        })
    }
}

module.exports = Server;