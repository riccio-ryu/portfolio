const express = require('express');
const router = express.Router();
const { Gallery } = require("../models/Gallery");
var ffmpeg = require('fluent-ffmpeg');

const { auth } = require("../middleware/auth");
const multer = require('multer');

var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/gallery/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !=='.jpg' || ext !=='.jpeg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")
//=================================
//             Gallery
//=================================

router.post('/uploadfiles', (req, res) => {
    //겔러리에서 가져온 것을 등록
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename, fileType: res.req.file.mimetype })
    })
})

router.post('/thumbnail', (req, res) => {
    //썸네일 생성, 비디오 러닝타임 가져옴
    let thumbsFilePath ="";
    let fileDuration ="";
    //thumb size adjust
    let thumbWidth=""
    let thumbHeight=""
    let thumbRatio=0
    let thumbRatioBase=24/32
    let thumbSize =''

    //정보 가져오기
    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata);

        // fileDuration = metadata.format.duration;
        
        // thumbWidth = metadata.streams[0].width;
        // thumbHeight = metadata.streams[0].height;
        // thumbRatio = thumbHeight/thumbWidth;
        // if(thumbRatio < thumbRatioBase){//longer the height
        //     thumbSize = `${Math.ceil(240*thumbWidth/thumbHeight)}x${240}`
        // }else{
        //     thumbSize = `${320}x${Math.ceil(thumbHeight*320/thumbWidth)}`
        // }
//console.log(thumbSize);

        //썸네일 생성
        if(req.body.fileType !== 'image'){
            ffmpeg(req.body.filePath)
                .on('filenames', function (filenames) {
                    console.log('Will generate ' + filenames.join(', '))
                    thumbsFilePath = "uploads/gallery/thumbnails/" + filenames[0];
                })
                .on('end', function () {
                    console.log('Screenshots taken');
                    return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration, fileType: 'video'})
                })
                .screenshots({
                    // Will take screens at 20%, 40%, 60% and 80% of the video
                    count: 1,
                    folder: 'uploads/gallery/thumbnails',
                    size: thumbSize,
                    // %b input basename ( filename w/o extension )
                    filename:'thumbnail-%b.png'
                });
        }else{
            ffmpeg(req.body.filePath)
                .on('end', function () {
                    console.log('Image taken')
                    thumbsFilePath = `uploads/gallery/thumbnails/thumbnail-${req.body.fileName.slice(0, req.body.fileName.lastIndexOf('.'))}.png`;
                    return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration, fileType: 'image'})
                })
                .save(`uploads/gallery/thumbnails/thumbnail-${req.body.fileName.slice(0, req.body.fileName.lastIndexOf('.'))}.png`)
        }
    })

})


router.post("/uploadGallery", (req, res) => {

    const gall = new Gallery(req.body)

    gall.save((err, gall) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});


router.get('/getGallerys', (req, res) => {
    //비디오를 db에서 가져와서 클라이언트로 보냄
    Gallery.find()
        .populate('writer')
        .exec((err, gallerys) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true , gallerys})
        })
});


router.post('/getGalleryDetail', (req, res) => {
    //비디오를 db에서 가져와서 클라이언트로 보냄
    Gallery.findOne({ "_id" : req.body.galleryId })
        .populate('writer')
        .exec((err, galleryDetail) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, galleryDetail })
        })

        //view count+
        Gallery.findOneAndUpdate({"_id": req.body.galleryId}, { $inc: {"views": 1}}, (err, view) => {
            if(err) return res.json({ success : false, err });
            return console.log('view count ++');
        })
});



module.exports = router;