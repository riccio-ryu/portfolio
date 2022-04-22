const express = require('express');
const app = express();
const port = 4000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require('./models/user');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { auth } = require('./middleware/auth');
mongoose.connect(config.mongoURI).then(() => console.log('mongoDB Connected')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {
  const user = User(req.body)

  user.save((err, doc) => {
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/login', (req, res) => {
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
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess:true, userId: user._id })
      })
    })
  })
})


app.get('/api/users/auth', auth , (req, res) => {
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


app.get('/api/users/logout', auth , (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({ success : false, err })
    return res.status(200).send({
      success: true
    })
  })
})


// app.get('/api/hello', (req, res) => {
//   res.send('hhhhhh')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})