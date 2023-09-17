const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post('/register', (req, res) => {
  const user = User(req.body)

  user.save((err, doc) => {
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success:true
    })
  })
})

router.post('/login', (req, res) => {
  //db에서 찾아봄
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }

    //요청된 메일과 비번비교 확인
    user.comparePassword( req.body.password , (err, isMatch) => {
      if(!isMatch){
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })
      }

      //모두 통과 시 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //token을 저장 (쿠키)
        res.cookie("petti_authExp", user.tokenExp);
        res.cookie("petti_auth", user.token).status(200).json({ loginSuccess:true, userId: user._id })
      })
    })
  })
})


router.get('/auth', auth , (req, res) => {
  //auth true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth : true,
    email: req.user.email,
    name: req.user.name,
    nick : req.user.nick,
    introduce: req.user.introduce,
    role: req.user.role,
    image: req.user.image
  })
})


router.get('/logout', auth , (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, user) => {
    if(err) return res.json({ success : false, err })
    res.clearCookie('petti_auth');
    return res.status(200).send({
      success: true
    })
  })
})

module.exports = router;