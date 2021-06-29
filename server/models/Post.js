import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    img: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            username: {
                type: String,
            },
            profileImage: {
                type: String,
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                },
            ],
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('post', PostSchema);

export default Post;
