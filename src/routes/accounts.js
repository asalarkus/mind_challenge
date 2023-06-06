const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


/**
 * @swagger
 * /api/index/run:
 *   get:
 *     summary: Allow to consult if server is running and ready to make requests.
 *     tags:
 *      - Index
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
router.get('/run', (req, res)=>{
    res.json({msg: 'Api running'});
});

module.exports = router;