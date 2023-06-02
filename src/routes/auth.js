const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { usersPost } = require('../controllers/users') 
const { validateFields } = require('../middlewares/validate-fields');

const { isValidRole, emailExists, existsUserById } = require('../helpers/db-validators');

const router = Router();


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Used to login as a user, needs to send email and password.
 *     tags:
 *      - AUTH
 *     description: Allow to init session as user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *          '200':
 *             description: The request was made and the server responded with
 *                 a status code it's resolved by a 2xx status with the data
 *                 from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xxfrom
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User email.
 *           example: asalcido@arkusnexus.com
 *         password:
 *           type: string
 *           description: Password using to login on service.
 *           example: hola123
 */
router.post('/sign-in', [
    check('email', "Email is required").isEmail(),
    check('password', "Password is required").not().isEmpty(),
    validateFields
], login);


/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Used to register a new user on database.
 *     tags:
 *      - AUTH
 *     description: Allow to create a new user on database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *          '200':
 *             description: The request was made and the server responded with
 *                 a status code it's resolved by a 2xx status with the data
 *                 from service layer
 *          '400':
 *              description: The request was made and the server responded with
 *                          a status code that falls out of the range of 2xxfrom
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

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name.
 *           example: Jose Dominguez
 *         email:
 *           type: string
 *           description: User email.
 *           example: jdominguez@arkusnexus.com
 *         password:
 *           type: string
 *           description: Password using to login on service.
 *           example: hola123
 *         role:
 *           type: string
 *           description: User role needs to be ADMIN or COMMON.
 *           example: ADMIN
 *         english_level:
 *           type: number
 *           description: User english level, needs to be a number between 1 to 5.
 *           example: 3
 *         tech_skills:
 *           type: string
 *           description: User tech skills.
 *           example: "JS, TS, Mongo, Express, Postgresql"
 *         cv_link:
 *           type: string
 *           description: User curriculum vitae link.
 *           example: "https://www.linkedin.com/in/alonsosalcido/"
 */
router.post('/sign-up', [
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
], usersPost);

module.exports = router;