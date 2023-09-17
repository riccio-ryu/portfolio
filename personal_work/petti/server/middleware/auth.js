const { User } = require("../models/User");


let auth = (req, res, next) => {
    //인증 처리

    //1. 쿠키에서 토큰을 가져옴
    let token = req.cookies.petti_auth;
    //2. 토큰을 복호화 한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })
        
        req.token = token;
        req.user = user;
        next();
    })
    //3-1. 유저가 있으면 인증
    //3-2. 유저가 없으면 노
}

module.exports = { auth }