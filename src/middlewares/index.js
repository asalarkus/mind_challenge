const validationFields  = require('../middlewares/validate-fields');
const validationJWT  = require('../middlewares/validate-jwt');
const validationRoles = require('../middlewares/validate-roles');
const loggerMorgan = require('../middlewares/morgan-logger');

module.exports = {
    ...validationFields,
    ...validationJWT,
    ...validationRoles,
    ...loggerMorgan
}