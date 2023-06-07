const { Schema, model } = require('mongoose');


const AccountSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    customer_name: {
        type: String,
        require: [true, 'Customer name is required']
    },
    operations_manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Manager is required']
    },
    team: {  
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        required: [false, 'Team is required']
    }
},
{
    timestamps: true
});


module.exports = model( 'Account', AccountSchema );
