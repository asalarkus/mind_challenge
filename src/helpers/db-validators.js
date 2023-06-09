const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {

    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error(`This role ${role} is not a valid role`);
    }
}

const emailExists = async( email = '' ) => {

    // Verificar if email exists
    const existsEmail = await User.findOne({ email });
    console.log("🚀 ~ file: db-validators.js:16 ~ emailExists ~ existsEmail:", existsEmail)
    if ( existsEmail ) {
        throw new Error(`This email: ${ email }, is already registered`);
    }
}

const existsUserById = async( id ) => {

    // Verificar if email existe
    const existsUser = await User.findById(id);
    if ( !existsUser ) {
        throw new Error(`This id ${ id } is not exists.`);
    }
}


module.exports = {
    isValidRole,
    emailExists,
    existsUserById
}

