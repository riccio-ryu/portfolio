const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Post'
   }

}, { timestamps: true })


const GalleryDislike = mongoose.model('GalleryDislike', dislikeSchema);

module.exports = { GalleryDislike }