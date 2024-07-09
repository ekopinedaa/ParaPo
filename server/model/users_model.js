const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = new mongoose.Schema({
    userid: {
        type: Number, // Change type to Number for auto-increment
        unique: true 
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
    },
    accountno: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    vehicletype: {
        type: String,
    }
})

UserSchema.plugin(AutoIncrement, { inc_field: 'userid' })

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel