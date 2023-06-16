const controller = require('../../../src/controllers/move-teams');
const model = require('../../../src/models/move-team');
const mockMovement = require('../../mockdata/move-team.json');
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
    req.body = { ...mockMovement }
});

afterEach(()=>{
    model.find.mockClear();
})

describe("controller.createMovementTeam", ()=>{
    test("controller.createMovementTeam is defined", () =>{
        expect(typeof controller.createMovementTeam).toBe('function')
    });

    test("create a valid employee", async ()=>{
        model.save.mockReturnValue(mockMovement);
        await controller.createMovementTeam(req, res. next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(mockMovement);
        expect(model.save).toBeCalledWith({...mockMovement})
    });
})