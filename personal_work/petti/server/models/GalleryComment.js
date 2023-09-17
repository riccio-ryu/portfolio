const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galleryCommentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })

const GalleryComment = mongoose.model('GalleryComment', galleryCommentSchema);

module.exports = { GalleryComment }