import mongoose from 'mongoose';

// create schema
const PhotoSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;