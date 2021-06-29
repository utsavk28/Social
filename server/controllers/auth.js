import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { validationResult } from 'express-validator';

import User from '../models/User.js';

// Load User
export const loadUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

// Login User
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
        let user;
        
        if(email)
        user = await User.findOne({ email });
        else 
        user = await User.findOne({ username });


        if (!user)
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }],
            });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }],
            });

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err;

            res.json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};
