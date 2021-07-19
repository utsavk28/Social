const express = require('express');
const { validationResult, check, oneOf } = require('express-validator');

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Get All Messages of a Conversation
const getMessages = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;

    try {
        const conversation = await Conversation.findById(id);
        if (!conversation) return res.status(404).json({ errors: 'Not Found' });
        const messages = await Message.find({ conversationId: id });

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

// Add a Message in conversation
const addMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { text } = req.body;
    const { id } = req.params;

    try {
        const conversation = await Conversation.findById(id);
        if (!conversation) return res.status(404).json({ errors: 'Not Found' });

        const message = new Message({
            conversationId: id,
            sender: req.user.id,
            text: text,
        });

        await message.save();
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getMessages,
    addMessage,
};
