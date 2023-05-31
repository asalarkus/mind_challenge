const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('../config');
const swagger_js_doc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');

const env = config.ENV;

let swagger_options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shopify Service Layer API',
            description: 'Shopify Service Layer API Docs',
            termsOfService: 'https://www.framatech.com/policies/privacy-policy',
            version: '1.0.1'
        },
        servers: []
    }, 
    apis: [`${path.join(__dirname, "../routes/*")}`]
};

if (env === 'dev') {
    swagger_options.definition.servers[0] = {
        url: `http://localhost:${config.PORT}`,
        description: 'Local server'
    }
} else {
    swagger_options.definition.servers[0] = {
        url: '',
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
            index: '/api/index',
            swagger: '/api/docs'
        }

        //Connect to database
        //this.dbConnect();

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
        //await dbConnection();
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

    }

    /**
     * Exposing routes on server.
     */
    routes(){
        this.app.get('/api', (req, res)=>{
            res.json({
                "msg": "get API"
            })
        })

        this.app.put('/api', (req, res)=>{
            res.status(400).json({
                "msg": "put API"
            })
        })

        this.app.post('/api', (req, res)=>{
            res.status(201).json({
                "msg": "post API"
            })
        })

        this.app.delete('/api', (req, res)=>{
            res.json({
                "msg": "delete API"
            })
        })

        this.app.patch('/api', (req, res)=>{
            res.json({
                "msg": "patch API"
            })
        })
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