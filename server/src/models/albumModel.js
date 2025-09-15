import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
    },
    artist : {
        type : String, 
        required : true,
    },
    imageURL : {
        type : String, 
        required : true,
    },
    releaseYear : {
        type : Date, 
        required : true,
    },
    songs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Song',
        }
    ],
}, {timestamps: true});

const Albums = mongoose.model('Album', albumSchema);
export default Albums;