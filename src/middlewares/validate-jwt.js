const { response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const validateJWT = (req = request , res = response, next )=>{
    const token = req.header('Authorization');
    console.log("🚀 ~ file: validate-jwt.js:6 ~ validateJWT ~ token:", token)

    if( !token ){
        return res.status(401).json({
            msg:"Unauthorize"
        })
    }

    try {

        const { uid } = jwt.verify( token, config.SECRETORPRIVATEKEY );
        
        req.uid = uid;

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