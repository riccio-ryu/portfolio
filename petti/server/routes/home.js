const express = require('express');
const router = express.Router();
const { Gallery } = require("../models/Gallery");

const { auth } = require("../middleware/auth");
//=================================
//             Home
//=================================


router.get('/getGalleryRecent', (req, res) => {
    //비디오를 db에서 가져와서 최신순으로 20개를 클라이언트로 보냄
    Gallery.find().sort({"updatedAt": -1}).limit(20)
        .populate('writer')
        .exec((err, gallerys) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true , gallerys})
        })
});


router.get('/getGalleryPopular', (req, res) => {
    Gallery.find().sort({"like": -1}).limit(20)
        .exec((err, popular) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, popular })
        })
});


router.get('/getGalleryMostView', (req, res) => {
    Gallery.find().sort({"views": -1}).limit(20)
        .exec((err, view) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, view })
        })
});


module.exports = router;