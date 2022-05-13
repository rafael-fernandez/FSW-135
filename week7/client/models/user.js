const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    profImg: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function(next){
    const user = this
    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.smash(user.password, 8, (err, smash) => {
        if(err){
            return next(err)
        }
        user.password = smash
        next()
    })
})

userSchema.methods.checkPassword = function(attempt, callback) {
    bcrypt.compare(attempt, this.password, (err, match) =>{
        if(err){
            return callback(err)
        }
        return callback(null, match)
    })
}

userSchema.methods.noPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema);