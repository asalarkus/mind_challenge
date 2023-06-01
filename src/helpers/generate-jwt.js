const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ( uid = '' ) =>{
    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign( payload,  config.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log("🚀 ~ file: generate-jwt.js:13 ~ returnnewPromise ~ err:", err)
                reject('We can`t create your json web token')
            }else{
                resolve( token );
            }
        })

    })
}


module.exports = {
    generateJWT
}