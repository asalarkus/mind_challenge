//Course https://www.udemy.com/course/master-jest-expressjs-nodejs-2020-may/
const controller = require('../../../src/controllers/teams');
const model = require('../../../src/models/team');
const mockTeam = require('../../mockdata/teams.json');
model.save = jest.fn();
model.find = jest.fn();
model.findOne = jest.fn();
let req, res, next;

beforeEach(()=>{
    model.save.mockClear();
    model.findOne.mockClear();
    bcrypt.hashSync.mockClear();
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
    req.body = { ...mockTeam }
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.createTeam", ()=>{
    test("controller.createTeam is defined", () =>{
        expect(typeof controller.createTeam).toBe('function')
    });

    test("create a valid team", async ()=>{
        model.save.mockReturnValue(mockUser);
        await controller.createTeam(req, res. next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(mockTeam);
        expect(model.save).toBeCalledWith({...mockTeam})
    });
})