const controller = require('../../../src/controllers/accounts');
const model = require('../../../src/models/account');
const httpMock = require('node-mocks-http');
const mockAccountList = require('../mockdata/accounts.json');
model.find = jest.fn();
model.findById = jest.fn();
let req, res, next;
req = httpMock.createRequest();
res = httpMock.createResponse();
next = null;

describe("controller.allAccountsGet", ()=>{
    test("get Accounts By Id function is defined", () =>{
        expect(typeof controller.allAccountsGet).toBe('function')
    });

    test("Return specific account by id", async ()=>{
        req.params.id = mockUsersList[0]._id;
        console.log("🚀 ~ file: controller.getusers.test.js:29 ~ test ~ req.params.id :", req.params.id )
        model.findById.mockReturnValue(mockAccountList[0]);
        await controller.usersGetById(req,res,next);
        expect(model.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(mockAccountList[0]);
    })
})