//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/users');
const model = require('../../../src/models/user');
const bcrypt = require('bcryptjs');
const httpMock = require('node-mocks-http');
const mockUser = require('../../mockdata/users.json');
model.save = jest.fn();
model.find = jest.fn();
model.findOne = jest.fn();
bcrypt.genSaltSync = jest.fn();
bcrypt.hashSync = jest.fn();
let req, res, next;

beforeEach(()=>{
    model.save.mockClear();
    model.findOne.mockClear();
    bcrypt.hashSync.mockClear();
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
    req.body = { ...mockUser }
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.usersPost", ()=>{
    test("controller.usersPost is defined", () =>{
        expect(typeof controller.usersPost).toBe('function')
    });

    test("create a valid employee", async ()=>{
        model.save.mockReturnValue(mockUser);
        bcrypt.hashSync.mockReturnValue("hashSynchashSyncasfdasd");
        bcrypt.genSaltSync.mockReturnValue();
        await controller.usersPost(req, res. next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(mockUser);
        expect(model.save).toBeCalledWith({...mockUser, password: "hashSynchashSyncasfdasd"})
    });
})