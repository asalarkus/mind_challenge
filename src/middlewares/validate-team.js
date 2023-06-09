const { response } = require("express");
const Team = require('../models/team')
const User = require('../models/user');

const isExistingOnTeam = async ( userId ) =>{

    // Verificar if email existe
    const existsUserOnTeam = await Team.findById(id);
    if ( !existsUser ) {
        throw new Error(`This id ${ id } is not exists.`);
    }
    next();
}

module.exports = {
    isExistingOnTeam,
    hasRole
}