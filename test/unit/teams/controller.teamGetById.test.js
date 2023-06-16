const controller = require('../../../src/controllers/teams');
const model = require('../../../src/models/team');
const httpMock = require('node-mocks-http');
const mockTeamsList = require('../mockdata/teams.json');
model.find = jest.fn();
model.findById = jest.fn();
let req, res, next;
req = httpMock.createRequest();
res = httpMock.createResponse();
next = null;

describe("controller.teamGetById", ()=>{
    test("get Team By Id function is defined", () =>{
        expect(typeof controller.teamGetById).toBe('function')
    });

    test("Return specific team by id", async ()=>{
        req.params.id = mockUsersList[0]._id;
        console.log("🚀 ~ file: controller.teamGetById.test.js:29 ~ test ~ req.params.id :", req.params.id )
        model.findById.mockReturnValue(mockTeamsList[0]);
        await controller.teamGetById(req,res,next);
        expect(model.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(mockUsersList[0]);
    })
})