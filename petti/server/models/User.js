const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    nick: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    introduce: {
        type: String,
        maxlength: 1000
    },
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function(next) {
    let user = this;

    if(user.isModified('password')){
        //비번 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next()
            });
        });
    }else{//no changed password
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    let user = this;
    //jwt use token make
    const token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}


userSchema.statics.findByToken = function (token, cb) {
    let user = this;

    //토큰을 decode
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해 유저를 찾고 -> 쿠키의 토큰과 db에 보관된 토큰 일치 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}