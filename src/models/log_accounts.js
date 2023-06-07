const { Schema, model } = require('mongoose');

const MoveAccountSchema = Schema({
    message: {
        type: String,
        required: [true, 'Name is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    team: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: [true, 'Team is required']
    }
},
{
    timestamps: true
});


module.exports = model( 'MoveAccount', MoveAccountSchema );
