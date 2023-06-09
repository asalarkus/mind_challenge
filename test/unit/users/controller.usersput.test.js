//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/users');
const model = require('../../../src/models/user');
const httpMock = require('node-mocks-http');
const mockUser = require('../../mockdata/users.json');
model.countDocuments = jest.fn();
model.find = jest.fn();
model.findByIdAndUpdate = jest.fn();
let req, res, next;

beforeEach(()=>{
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.usersPut", ()=>{
    test("findByIdAndUpdate function is defined", () =>{
        expect(typeof controller.usersGet).toBe('function')
    });

    test("Update existing user with name", async()=>{
        let toUpdate = { ...mockUser[0], name: "Alonso Jimenez" };
        req.params.id = mockUser[0]._id;
        req.body = { ...toUpdate };
        console.log("🚀 ~ file: controller.usersPut.test.js:30 ~ test ~ req.body:", req.body)
        model.findByIdAndUpdate.mockReturnValue(toUpdate);
        await controller.usersPut(req, res, next);
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            req.params.id, 
            { name: req.body.name },
            { useFindAndModify: false }
        );
        expect(res.statusCode).toEqual(201);
        expect(res._getJSONData()).toStrictEqual(toUpdate);
    })
})

