const { response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const validateJWT = async(req = request , res = response, next )=>{
    let token = req.header('Authorization');

    if (token && token.startsWith('Bearer ')) {
        // Remove "Bearer " from the authHeader
        token = token.slice(7, token.length);
    }

    if( !token ){
        return res.status(401).json({
            msg:"Unauthorize"
        })
    }

    try {

        const { uid } = jwt.verify( token, config.SECRETORPRIVATEKEY );

        //Read user by uid
        const user = await User.findById( uid );

        if( !user ){
            return res.status(401).json({
                msg: 'No valid Token - User does not exists'
            })
        }

        // Verify if uid has status in tru
        if( !user.status ){
            return res.status(401).json({
                msg: 'No valid Token - status:false'
            })
        }

        req.user = user;

        next();
    } catch (err) {
        console.log("🚀 ~ file: validate-jwt.js:18 ~ validateJWT ~ err:", err);
        res.status(401).json({
            msg: "No valid token"
        })
    }
    
}

module.exports = {
    validateJWT
}