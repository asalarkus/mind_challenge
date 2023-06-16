//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/move-teams');
const model = require('../../../src/models/move-team');
const httpMock = require('node-mocks-http');
const mockMovement = require('../../mockdata/move-team.json');
model.find = jest.fn();
model.findById = jest.fn();
let req, res, next;

beforeEach(()=>{
    req = httpMock.createRequest();
    req.params.id = mockMovement[0]._id;
    res = httpMock.createResponse();
    next = null;
});

afterEach(()=>{
    model.findByIdAndUpdate.mockClear();
})


describe("controller.movementGetById", ()=>{
    test("get Log Movement By Id function is defined", () =>{
        expect(typeof controller.movementGetById).toBe('function')
    });

    test("Return specific log movement by id", async ()=>{
        req.params.id = mockMovement[0]._id;
        console.log("🚀 ~ file: controller.movementGetById.test.js:29 ~ test ~ req.params.id :", req.params.id )
        model.findById.mockReturnValue(mockMovement[0]);
        await controller.usersGetById(req,res,next);
        expect(model.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(mockMovement[0]);
    })
})

