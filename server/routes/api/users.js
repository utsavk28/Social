import express from 'express';
import { check } from 'express-validator';

import { registerUser } from '../../controllers/users.js';

const router = express.Router();

// @router  Post api/users (Register User Route)
// @desc    Register User
// @access  Public
// @return  jwt token
router.post(
    '/',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check(
            'password',
            'Please enter a password of length more than 6'
        ).isLength({ min: 6 }),
    ],
    registerUser
);

export default router;
