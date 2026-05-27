import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
    },
    imageURL: {
        type: String,
        default: '',
      },
      
      favoriteSongs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
        }
    ],
},{timestamps: true});

const Users = mongoose.model('User', userSchema);
export default Users;