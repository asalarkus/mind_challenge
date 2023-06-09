//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/accounts');
const model = require('../../../src/models/account');
const httpMock = require('node-mocks-http');
const mockAccountsList = require('../mockdata/accounts.json');
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

describe("controller.allAccountsGet", ()=>{
    test("get Users function is defined", () =>{
        expect(typeof controller.allAccountsGet).toBe('function')
    });

    test("Return array of accounts from database", async ()=>{
        model.find.mockReturnValue(mockAccountsList);
        await controller.allAccountsGet(req, res, next);
        console.log("🚀 ~ file: controller.allAccountsGet.test.js:30 ~ test ~ res.statusCode:", res.statusCode)
        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toStrictEqual(mockAccountsList);
    })

    test("Return 404 when db is empty", async ()=>{
        model.find.mockReturnValue(null);
        await controller.mockAccountsList(req, res, next);
        expect(res.statusCode).toEqual(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Return 505 when find throw exception", async ()=>{
        model.find.mockRejectedValue("error");
        await controller.mockAccountsList(req, res, next);
        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toStrictEqual("error")
    })
})

