const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Conversation = mongoose.model('conversation', ConversationSchema);

module.exports = Conversation;
