const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    console.log("🚀 ~ file: users.js:28 ~ usersPost ~ user:", user)

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, ...rest } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    // We can deleted physically 
    // const usuario = await Usuario.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { status: false } );


    res.json(user);
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}