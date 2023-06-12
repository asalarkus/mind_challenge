const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required: [true, 'Emails is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    english_level: {
        type: Number,
        min: 1,
        max: 5,
        required: [false, 'English Level is required']
    },
    tech_skills: { 
        type: String,
        required: [false, 'Tech skills is required']
    },
    cv_link: {
        type: String,
        required: [false, 'CV Link is required']
    },
    role: {
        type: String,
        required: true,
        enum: [ "SUPER", "ADMIN", "COMMON" ]
    },
    status:{
        type: Boolean,
        default: true
    },
    team: {
        type: Schema.Types.ObjectId, 
        ref: 'Team',
        required: [false, 'Team is required']
    }
},
{
    timestamps: true
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema )