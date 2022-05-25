const express = require('express');
const router = express.Router();
const { GalleryComment } = require('../models/GalleryComment');

const { auth } = require("../middleware/auth");

//=================================
//             GalleryComment
//=================================;

router.post('/saveGalleryComment', (req, res) => {
    const comment = new GalleryComment(req.body);

    comment.save((err, comment) => {
        if(err) return res.json({ success: false, err })

        GalleryComment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.json({ success:false, err })
            return res.status(200).json({ success: true, result })
        })
    })

});


router.post('/getGalleryComments', (req, res) => {
    GalleryComment.find({ "postId" : req.body.galleryId })
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});


module.exports = router;