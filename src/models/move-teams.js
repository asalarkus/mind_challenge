const { Schema, model } = require('mongoose');

const MoveTeamsSchema = Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fromTeam: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
        required: [true, 'Team is required']
    },
    toTeam:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
        required: [true, 'Team is required']
    }, 
    startDate: { type: Date, required: [true, 'startDate is required'] },
    endDate: { type: Date, required: [true, 'endDate is required'] }
},
{
    timestamps: true
});


module.exports = model( 'MoveAccount', MoveTeamsSchema );
