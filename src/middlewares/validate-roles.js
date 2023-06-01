const { response } = require("express");

const isSuperAdminRole = ( req, res = response, next ) =>{
    if( !req.user ){
        return res.status(500).json({
            msg: 'Needs to verify first user token and user role later.'
        })
    }

    const { role, name } = req.user

    if(role !== 'SUPER' && role !== 'ADMIN'){
        return res.status(401).json({
            msg: `${name} is not and administrator or a super user - can't perform this action`
        })
    }
    next();
}

const hasRole = ( ...roles ) =>{
    return (req, res = response, next) =>{
        if( !req.user ){
            return res.status(500).json({
                msg: 'Needs to verify first user token and user role later.'
            })
        }

        if( !roles.includes( req.user.role ) ){
            return res.status(401).json({
                msg: `This service needs one of these roles ${roles}`
            })
        }
        
        next();
    }
}

module.exports = {
    isSuperAdminRole,
    hasRole
}