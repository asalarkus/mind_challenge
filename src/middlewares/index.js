const validationFields  = require('../middlewares/validate-fields');
const validationJWT  = require('../middlewares/validate-jwt');
const validationRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validationFields,
    ...validationJWT,
    ...validationRoles
}