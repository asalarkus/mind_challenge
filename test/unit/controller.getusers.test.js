const controller = require('../../src/controllers/users');
const model = require('../../src/models/user');

describe("controller.getUsers", ()=>{
    test("get Users function is defined", () =>{
        expect(typeof controller.usersGet).toBe('function')
    })
})