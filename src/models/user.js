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
        required: [true, 'English Level is required']
    },
    tech_skills: { 
        type: String,
        required: [true, 'Tech skills is required']
    },
    cv_link: {
        type: String,
        required: [true, 'CV Link is required']
    },
    role: {
        type: String,
        required: true,
        enum: [ "SUPER", "ADMIN", "COMMON" ]
    },
    status:{
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'User', UserSchema )