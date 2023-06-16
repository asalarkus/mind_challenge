//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/teams');
const model = require('../../../src/models/team');
const httpMock = require('node-mocks-http');
const mockTeamsList = require('../mockdata/teams.json');
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

describe("controller.allTeamsGet", ()=>{
    test("get Users function is defined", () =>{
        expect(typeof controller.allTeamsGet).toBe('function')
    });

    test("Return array of teams from database", async ()=>{
        model.find.mockReturnValue(mockTeamsList);
        await controller.allTeamsGet(req, res, next);
        console.log("🚀 ~ file: controller.allTeamsGet.test.js:30 ~ test ~ res.statusCode:", res.statusCode)
        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toStrictEqual(mockTeamsList);
    })

    test("Return 404 when db is empty", async ()=>{
        model.find.mockReturnValue(null);
        await controller.allTeamsGet(req, res, next);
        expect(res.statusCode).toEqual(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Return 505 when find throw exception", async ()=>{
        model.find.mockRejectedValue("error");
        await controller.allTeamsGet(req, res, next);
        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toStrictEqual("error")
    })
})

