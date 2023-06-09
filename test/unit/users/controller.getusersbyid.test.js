const controller = require('../../src/controllers/users');
const model = require('../../src/models/user');
const httpMock = require('node-mocks-http');
const mockUsersList = require('../mockdata/users.json');
model.find = jest.fn();
model.findById = jest.fn();
let req, res, next;
req = httpMock.createRequest();
res = httpMock.createResponse();
next = null;

describe("controller.usersGetById", ()=>{
    test("get Users By Id function is defined", () =>{
        expect(typeof controller.usersGetById).toBe('function')
    });

    test("Return specific user by id", async ()=>{
        req.params.id = mockUsersList[0]._id;
        console.log("🚀 ~ file: controller.getusers.test.js:29 ~ test ~ req.params.id :", req.params.id )
        model.findById.mockReturnValue(mockUsersList[0]);
        await controller.usersGetById(req,res,next);
        expect(model.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(mockUsersList[0]);
    })
})