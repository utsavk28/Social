const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedPostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
    },
    savedPosts: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'posts',
            },
        },
    ],
});

const SavedPost = mongoose.model('savedpost', SavedPostSchema);

module.exports = SavedPost;
