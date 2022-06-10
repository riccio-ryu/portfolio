const express = require('express');
const router = express.Router();
const { GalleryLike } = require('../models/GalleryLike');
const { GalleryDislike } = require('../models/GalleryDislike');

const { auth } = require("../middleware/auth");
const { Gallery } = require('../models/Gallery');

//=================================
//             Like Dislike
//=================================;

router.post('/getLikes', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId }
    }else{
        variable = { commentId: req.body.commentId }
    }

    GalleryLike.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })

});


router.post('/getDislikes', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId }
    }else{
        variable = { commentId: req.body.commentId }
    }

    GalleryDislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })

});


router.post('/upLike', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new GalleryLike(variable)
    like.save((err, likeResult) => {
        if(err) return res.json({ success: false, err });
        GalleryDislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({ success: false, err})
                res.status(200).json({ success: true});

                // if dislike did....
                if(dislikeResult){
                    console.log('tr');
                    Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"dislike": -1}}, (err, dislikeDown) => {
                        if(err) return res.json({ success : false, err });
                        return console.log('dislike down success');
                    })
                }
            });


            if(req.body.postId){
                // Gallery like +1
                Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"like": 1}}, (err, likeUp) => {
                    if(err) return res.json({ success : false, err });
                    return console.log('like up success');
                })
            }

    })

});


router.post('/unLike', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    GalleryLike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success:false, err })
            res.status(200).json({ success: true })
        })

    if(req.body.postId){
        // Gallery like +1
        Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"like": -1}}, (err, likeUn) => {
            if(err) return res.json({ success : false, err });
            return console.log('like un success');
        })
    }

});


router.post('/upDislike', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const dislike = new GalleryDislike(variable)
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({ success: false, err });
        GalleryLike.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({ success: false, err})
                res.status(200).json({ success: true});

                // if like did....
                if(dislikeResult){
                    Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"like": -1}}, (err, likeDown) => {
                        if(err) return res.json({ success : false, err });
                        return console.log('like down success');
                    })
                }
            });


            if(req.body.postId){
                // Gallery like +1
                Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"dislike": 1}}, (err, dislikeUp) => {
                    if(err) return res.json({ success : false, err });
                    return console.log('dislike up success');
                })
            }

    })

});


router.post('/unDislike', (req, res) => {
    
    let variable ={}
    if(req.body.postId){
        variable = { postId: req.body.postId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Gallery.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success:false, err })
            res.status(200).json({ success: true })
        })

        if(req.body.postId){
            // Gallery like +1
            Gallery.findOneAndUpdate({"_id": variable.postId}, { $inc: {"dislike": -1}}, (err, dislikeUn) => {
                if(err) return res.json({ success : false, err });
                return console.log('dislike un success');
            })
        }
    
});


module.exports = router;