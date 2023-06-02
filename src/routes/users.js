
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

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Allow to consult all users present on database, only admin and super user can consult this.
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
router.get('/', [
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
], usersGet );

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   get:
 *     summary: Allow to consult specific user data by uid.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Id of user to get
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
router.get('/:id', [
    validateJWT,
    hasRole("SUPER", "ADMIN", "COMMON"),
    check('id', 'is not a valid Id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
], usersGetById );


/**
 * @swagger
 * /api/v1/users/{uid}:
 *   put:
 *     summary: Allow to update specific user using uid.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Id of user to get
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
router.put('/:id',[
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
    check('id', 'is not a valid Id').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isValidRole ), 
    validateFields
], usersPut );

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Allow to create a new user.
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
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

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   patch:
 *     summary: Allow to update specific data from user.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Id of user to get
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
router.patch('/',[
    validateJWT,
    hasRole("SUPER", "ADMIN", "COMMON"),
], usersPatch );

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   delete:
 *     summary: Allow to make a soft delete to a specific user using uid, this api just change status prop on database to false.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Id of user to change status prop to false
 *     tags:
 *      - Users
 *     responses:
 *          '200':
 *              description: The request was made and the server responded with
 *                  a status code it's resolved by a 2xx status with the data
 *                  from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xx from
 *                          the service layer data
 *          '500':
 *              description: The request was made but no response was *
 *                           received, `error.request` is an instance
 *                           of XMLHttpRequest in the browser and an instance
 *                           of http.ClientRequest in Node.js
 *          '403':
 *              description: Error on authentication with token from user to
 *                           access to endpoint and data, result auth false,
 *                           message NO AUTHORIZE
 *
 */
router.delete('/:id',[
    validateJWT,
    isSuperAdminRole,
    hasRole("SUPER", "ADMIN"),
    check('id', 'Id is not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],usersDelete );

module.exports = router;