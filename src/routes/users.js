
const { Router } = require('express');
const { check } = require('express-validator');


const {
    validateFields,
    validateJWT,
    isSuperAdminRole,
    hasRole
} = require('../middlewares')
const { isValidRole, emailExists, existsUserById } = require('../helpers/db-validators');

const { usersGet,
        usersGetById,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

const router = Router();

router.get('/', [
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
], usersGet );

router.get('/:id', [
    validateJWT,
    hasRole("SUPER", "ADMIN", "COMMON"),
    check('id', 'is not a valid Id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
], usersGetById );

router.put('/:id',[
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
    check('id', 'is not a valid Id').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isValidRole ), 
    validateFields
], usersPut );

router.post('/',[
    /*validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),*/
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password needs to be more than 6 characters').isLength({ min: 6 }),
    check('email', 'Emails is not valid').isEmail(),
    check('email').custom( emailExists ),
    check('role').custom( isValidRole ),
    /*check('english_level').custom( isValidRole ),
    check('tech_skills').custom( isValidRole ),
    check('cv_link').custom( isValidRole ), */
    validateFields
], usersPost );

router.delete('/:id',[
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
    check('id', 'Id is not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],usersDelete );

router.patch('/',[
    validateJWT,
    hasRole("SUPER", "ADMIN", "COMMON"),
], usersPatch );

module.exports = router;