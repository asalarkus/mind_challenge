const { Schema, model } = require('mongoose');

const TeamSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    users: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: [true, 'User is required']
    }
},
{
    timestamps: true
});


module.exports = model( 'Team', TeamSchema );
