const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { 
    allMovementsGet,
    movementGetById,
    createMovementTeam } = require('../controllers/move-teams');

/**
 * @swagger
 * /api/v1/movements:
 *   get:
 *     summary: Allow to consult all movements exists on database.
 *     tags:
 *      - (LOG) Movements Teams
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
router.get('/', [], allMovementsGet);

/**
 * @swagger
 * /api/v1/movements/{uid}:
 *   get:
 *     summary: Allow to consult specific team data by uid.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Team ID to get
 *     tags:
 *      - (LOG) Movements Teams
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
], movementGetById );


/**
 * @swagger
 * /api/v1/movements:
 *   post:
 *     summary: Allow to create a new move between teams.
 *     tags:
 *      - (LOG) Movements Teams
 *     description: Allow to create a new user movement between teams on database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostMovement'
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
 *     PostMovement:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: User Id.
 *           example: 6478b86d2b4f421477d127f3
 *         fromTeamId:
 *           type: string
 *           description: Origin Team Id.
 *           example: 6478b86d2b4f421477d127f3
 *         toTeamId:
 *           type: string
 *           description: Destination Team Id.
 *           example: 6478b86d2b4f421477d127f3
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FromTeam:
 *       type: object
 *       properties:
 *         teamId:
 *           type: schema
 *           description: Origin Team Id.
 *           example: 6481feb22dd793bf3e4d40fc
 *         teamName:
 *           type: string
 *           description: Origin Team Name.
 *           example: Noders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ToTeam:
 *       type: object
 *       properties:
 *         teamId:
 *           type: schema
 *           description: New Team Id.
 *           example: 6481ff7765cb65b6990b8486
 *         teamName:
 *           type: string
 *           description: New Team Name.
 *           example: CSharperos
 */
router.post('/',[
    /*validateJWT,
    validateFields*/
], createMovementTeam );

module.exports = router;