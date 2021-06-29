import express from 'express';
import { check, oneOf } from 'express-validator';

import auth from '../../middleware/auth.js';
import { loginUser, loadUser } from '../../controllers/auth.js';

const router = express.Router();

// @router  GET api/auth (Load User Route)
// @desc    To Load User
// @access  Private
// @return  curr user
router.get('/', auth, loadUser);

// @router  Post api/auth (Login Route)
// @desc    Authenticate Users & get Auth Token
// @access  Public
// @return  jwt token
router.post(
    '/',
    [
        oneOf([
            check(
                'email',
                'Please include a valid Email or Username'
            ).isEmail(),
            check('username', 'Please include a valid Email or Username').not()
                .isEmpty(),
        ]),
        check('password', 'Please check your Password').exists(),
    ],
    loginUser
);

export default router;
