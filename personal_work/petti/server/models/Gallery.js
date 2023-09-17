const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    filePath : {
        type: String,
    },
    fileType : {
        type: String,
    },
    tag: String,
    category: String,
    views : {
        type: Number,
        default: 0 
    },
    like: {
        type: Number,
        default: 0 
    },
    dislike: {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })



const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = {Gallery}