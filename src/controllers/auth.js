const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { logger } = require('../middlewares');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt')

const login = async(req, res = response) =>{

    const { email, password } = req.body;
    console.log("🚀 ~ file: auth.js:11 ~ login ~ req.body:", req.body)

    try {

        //Check if email exists
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msg:" Email / Password are not valid "
            })
        }

        //If user is status active

        if( !user ){
            return res.status(400).json({
                msg:" Email / Password are not valid - status: false"
            })
        }

        //Check password 
        const validPassword = bcryptjs.compareSync(password, user.password);

        if( !validPassword ){
            return res.status(400).json({
                msg:" Email / Password are not valid - password"
            })
        }

        //Create JWT

        const token = await generateJWT( user.id );
    
        res.json({
            success: true,
            token,
            role: user.role,
            uid: user._id
        })
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            msg:'Somenthing is wrong'
        })
    }
}


module.exports = {
    login
}