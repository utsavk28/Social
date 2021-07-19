const { validationResult } = require('express-validator');

const User = require('../models/User');
const Conversation = require('../models/Conversation');

// Get All Users Conversations
 const getAllUserConv = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        let conversations = await Conversation.find({
            members: {
                $all: [req.user.id],
            },
        }).populate('members');

        return res.status(200).json(conversations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'Server Error' });
    }
};

// Get Conversation Id of Two or Group of Users
 const getUserConvBetweenTwo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.id, req.user.id],
            },
        }).populate('members');

        if (!conversation) {
            return res.status(404).json({
                error: 'Conversation not found',
            });
        }

        return res.status(200).json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'Server Error' });
    }
};

// Start Conversation between Users
 const createConv = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        let conversation = await Conversation.findOne({
            members: {
                $all: [req.params.id, req.user.id],
            },
        });

        console.log(conversation);

        if (conversation) {
            return res.status(409).json({
                error: 'Conversation already exists',
            });
        }

        conversation = new Conversation({
            members: [req.params.id, req.user.id],
        });

        console.log(conversation);

        conversation = await conversation.save();
        return res.status(200).json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'Server Error' });
    }
};

module.exports = {
    createConv,
    getAllUserConv,
    getUserConvBetweenTwo,
};
