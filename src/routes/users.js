
const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isValidRole, emailExists, existsUserById } = require('../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

const router = Router();

router.get('/', usersGet );

router.put('/:id',[
    check('id', 'is not a valid Id').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isValidRole ), 
    validateFields
], usersPut );

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password needs to be more than 6 characters').isLength({ min: 6 }),
    check('email', 'Emails is not valid').isEmail(),
    check('email').custom( emailExists ),
    check('role').custom( isValidRole ), 
    validateFields
], usersPost );

router.delete('/:id',[
    validateJWT,
    check('id', 'Id is not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],usersDelete );

router.patch('/', usersPatch );

module.exports = router;