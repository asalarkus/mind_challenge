const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { allAccountsGet, createAccount, accountGetById } = require('../controllers/accounts');

/**
 * @swagger
 * /api/v1/acccounts:
 *   get:
 *     summary: Allow to consult all account exists on databsae.
 *     tags:
 *      - Accounts
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
router.get('/', [], allAccountsGet);

/**
 * @swagger
 * /api/v1/acccounts/{uid}:
 *   get:
 *     summary: Allow to consult specific account data by uid.
 *     parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        required: true
 *        description: Numeric Account ID to get
 *     tags:
 *      - Accounts
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
], accountGetById );


/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     summary: Allow to create a new account.
 *     tags:
 *      - Accounts
 *     description: Allow to create a new account on database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostAccount'
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
 *     PostAccount:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Account name.
 *           example: MYKONOS
 *         customer_name:
 *           type: string
 *           description: Customer name contact.
 *           example: Jose Ortiz
 *         operations_manager:
 *           type: string
 *           description: Operations Manager user.
 *           example: 6478ecd6ea616119e4afa809
 *         team:
 *           type: string
 *           description: Team UID to make relationship between team and account.
 *           example: 6478b86d2b4f421477d127f3
 */
router.post('/',[
    /*validateJWT,
    validateFields*/
], createAccount );

module.exports = router;