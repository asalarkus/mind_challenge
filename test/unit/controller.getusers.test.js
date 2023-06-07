const controller = require('../../src/controllers/users');
const model = require('../../src/models/user');
const httpMock = require('node-mocks-http');
const mockUsersList = require('../mockdata/users.json');
model.countDocuments = jest.fn();
model.find = jest.fn();
model.findById = jest.fn();
let req, res, next;

beforeEach(()=>{
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.allUsersGet", ()=>{
    test("get Users function is defined", () =>{
        expect(typeof controller.usersGet).toBe('function')
    });

    test("Return array of users from database", async ()=>{
        model.find.mockReturnValue(mockUsersList);
        await controller.allUsersGet(req, res, next);
        console.log("🚀 ~ file: controller.getusers.test.js:30 ~ test ~ res.statusCode:", res.statusCode)
        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toStrictEqual(mockUsersList);
    })

    test("Return 404 when db is empty", async ()=>{
        model.find.mockReturnValue(null);
        await controller.allUsersGet(req, res, next);
        expect(res.statusCode).toEqual(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Return 505 when find throw exception", async ()=>{
        model.find.mockRejectedValue("error");
        await controller.allUsersGet(req, res, next);
        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toStrictEqual("error")
    })
})

