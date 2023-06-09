const { Schema, model } = require('mongoose');

const FromTeamSchema = Schema({
    teamId: {
        type: Schema.Types.ObjectId, 
        ref: 'Team',
        required: [true, 'Team id is required']
    },
    teamName: {
        type: String,
        required: [true, 'Team Name is required']
    }
}, { _id : false })

const ToTeamSchema = Schema({
    teamId: {
        type: Schema.Types.ObjectId, 
        ref: 'Team',
        required: [true, 'Team id is required']
    },
    teamName: {
        type: String,
        required: [true, 'Team Name is required']
    }
}, { _id : false });

const MoveTeamsSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    fromTeamId: { type: String, required: [true, 'From Team Id is required'] },
    fromTeamName: { type: String, required: [true, 'From Team Name is required'] },
    toTeamId: { type: String, required: [true, 'To Team Id is required'] },
    toTeamName: { type: String, required: [true, 'To Team Name is required'] },
    startDate: { type: Date, required: [true, 'startDate is required'] },
    endDate: { type: Date, required: [true, 'endDate is required'] }
},
{
    timestamps: true
});

module.exports = model( 'MoveAccount', MoveTeamsSchema );
