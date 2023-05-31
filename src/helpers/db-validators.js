const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {

    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error(`This role ${role} is not a valid role`);
    }
}

const emailExists = async( email = '' ) => {

    // Verificar si el correo existe
    const existsEmail = await Usuario.findOne({ email });
    if ( existsEmail ) {
        throw new Error(`This email: ${ correo }, is already registered`);
    }
}

const existsUserById = async( id ) => {

    // Verificar si el correo existe
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

