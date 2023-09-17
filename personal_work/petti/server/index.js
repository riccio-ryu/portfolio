const express = require('express');
const app = express();
const port = 4000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI).then(() => console.log('mongoDB Connected')).catch(err => console.log(err))

app.use('/api/users', require('./routes/users'));
app.use('/api/home', require('./routes/home'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/galleryComment', require('./routes/galleryComment'));
app.use('/api/galleryLike', require('./routes/galleryLike'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/api/hello', (req, res) => {
//   res.send('hhhhhh')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})