const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserSchema = new schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    PassWord: {
        type: String,
        required:true
    },
    SignupDate: {
        type: Date,
        required: true,
        default: Date.now
    },

})
module.exports = mongoose.model('User',UserSchema)