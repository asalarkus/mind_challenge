//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/accounts');
const model = require('../../../src/models/account');
const bcrypt = require('bcryptjs');
const httpMock = require('node-mocks-http');
const mockAccount = require('../../mockdata/accounts.json');
model.save = jest.fn();
model.find = jest.fn();
model.findOne = jest.fn();
let req, res, next;

beforeEach(()=>{
    model.save.mockClear();
    model.findOne.mockClear();
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
    req.body = { ...mockAccount }
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.createAccount", ()=>{
    test("controller.createAccount is defined", () =>{
        expect(typeof controller.createAccount).toBe('function')
    });

    test("create a valid account", async ()=>{
        model.save.mockReturnValue(mockUser);
        await controller.createAccount(req, res. next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(mockAccount);
        expect(model.save).toBeCalledWith({...mockAccount})
    });
})