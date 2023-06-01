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
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'User', UserSchema )