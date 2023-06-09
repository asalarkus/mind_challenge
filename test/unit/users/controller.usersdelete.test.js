//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/users');
const model = require('../../../src/models/user');
const httpMock = require('node-mocks-http');
const mockUser = require('../../mockdata/users.json');
model.findByIdAndUpdate = jest.fn();
let req, res, next;

beforeEach(()=>{
    req = httpMock.createRequest();
    req.params.id = mockUser[0]._id;
    res = httpMock.createResponse();
    next = null;
});

afterEach(()=>{
    model.findByIdAndUpdate.mockClear();
})

describe("controller.usersDelete", ()=>{
    test("soft delete Users function is defined", () =>{
        expect(typeof controller.usersDelete).toBe('function')
    });

    test("soft delete valid user on database", async() =>{
        model.findByIdAndUpdate.mockResolvedValue(mockUser[0]);
        await controller.usersDelete(req, res, next);
        expect(model.findByIdAndUpdate).toBeCalledWith(mockUser[0]._id);
        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toStrictEqual(mockUser[0]);
    });


})

