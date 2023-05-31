const express = require('express');
const cors = require('cors');

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
        this.port = process.env.PORT;

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

    /**
     * Middlewares method to setup all packages using on project.
     */
    middlewares(){

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
            console.log("Server running on port, ", this.port);
        })
    }
}

module.exports = Server;