import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    followers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        },
    ],
    following: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        },
    ],
    DOB: {
        type: Date,
    },
});

const Profile = mongoose.model('profile', ProfileSchema);

export default Profile;
