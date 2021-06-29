import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { validationResult } from 'express-validator';

import User from '../models/User.js';

// Register User
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });

        if (user)
            return res.status(400).json({
                errors: [{ msg: 'User already Exists. Please check your email & username' }],
            });

        user = new User({
            username,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};
