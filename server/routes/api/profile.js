import express from 'express';
import auth from '../../middleware/auth.js';

import {
    getCurrProfile,
    getAllProfile,
    updateProfile,
    getProfileByUserName,
    deleteProfile
} from '../../controllers/profile.js';

const router = express.Router();

// @route       GET api/profile/
// @description Get current user's profile
// @access      Private
// @return      Curr Profile
router.get('/', auth, getCurrProfile);

// @route       GET api/profile/all
// @description Get all user's profile
// @access      Public
// @return      All Posts
router.get('/all', getAllProfile);

// // @route       GET api/profile/user_id
// // @description Get profile by user Id
// // @access      Public
// // @return      Individual Posts
// router.get('/user/:id', getProfileById);

// @route       GET api/profile/user/:username
// @description Get profile by username
// @access      Public
// @return      Individual Profile
router.get('/user/:username', getProfileByUserName);

// @route       POST api/profile
// @description Create or update user profile
// @access      Private
// @return      Curr Profile
router.post('/', auth, updateProfile);

// @route       Delete api/profile
// @description Delete profile,user & posts
// @access      Private
// @return      null
router.delete('/',auth,deleteProfile);

export default router;
