import express from 'express';
import auth from '../../middleware/auth.js';

import {
    getCurrProfile,
    getAllProfile,
    updateProfile,
    getProfileById,
    getProfileByUserName,
    deleteProfile,
    addFollower,
    addFollowing,
    removeFollower,
    removeFollowing,
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

// @route       GET api/profile/user/id/user_id
// @description Get profile by user Id
// @access      Public
// @return      Individual Posts
router.get('/user/id/:id', getProfileById);

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
router.delete('/', auth, deleteProfile);

router.put('/add/follower/:id', auth, addFollower);

router.put('/add/following/:id', auth, addFollowing);

router.put('/delete/follower/:id', auth, removeFollower);

router.put('/delete/following/:id', auth, removeFollowing);

export default router;
