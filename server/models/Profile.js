import mongooose from 'mongoose';

const ProfileSchema = new mongooose.Schema({
    user: {
        type: mongooose.Schema.Types.ObjectId,
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
    DOB: {
        type: Date,
    },
});

const Profile = mongooose.model('profile', ProfileSchema);

export default Profile;
