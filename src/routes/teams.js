const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { allTeamsGet,
    teamGetById,
    createTeam } = require('../controllers/teams');

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Allow to consult all teams exists on database.
 *     tags:
 *      - Teams
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
router.get('/', [], allTeamsGet);

/**
 * @swagger
 * /api/v1/teams/{uid}:
 *   get:
 *     summary: Allow to consult specific team data by uid.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Team ID to get
 *     tags:
 *      - Teams
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
   /*validateJWT,
    validateFields*/
], teamGetById );


/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Allow to create a new team.
 *     tags:
 *      - Teams
 *     description: Allow to create a new account on database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostTeam'
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

/**
 * @swagger
 * components:
 *   schemas:
 *     PostTeam:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Team name.
 *           example: Noders
 *         users:
 *           type: Array
 *           description: Users UID Array.
 *           example: [6479117f686ed5dee959ba8b,6479161f437436c78d20495f,6479168d437436c78d204967]
 */
router.post('/',[
    /*validateJWT,
    validateFields*/
], createTeam );

module.exports = router;