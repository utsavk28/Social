import gravatar from 'gravatar';

import Profile from '../models/Profile.js';
import User from '../models/User.js';

// Get Curr Profile
export const getCurrProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['username', 'email']
        );

        if (!profile)
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user!!' });

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get individual Profile
export const getProfileByUserName = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const profile = await Profile.findOne({
            user: user._id,
        }).populate('user', ['username', 'email']);

        if (!profile)
            return res.status(400).json({
                msg: 'Profile not found',
            });

        res.json(profile);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get All Profiles
export const getAllProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'username',
            'email',
        ]);

        res.json(profiles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Create or Update Profile
export const updateProfile = async (req, res) => {
    const { bio, DOB, name, profileImg } = req.body;

    try {
        let { email } = await User.findById(req.user.id);
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            // Get user gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            profile = new Profile({
                user: req.user.id,
                bio,
                DOB,
                name,
                profileImg: profileImg ? profileImg : avatar,
            });
            await profile.save();
            return res.json({ profile, msg: 'Profile Created' });
        }

        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { bio, DOB, name, profileImg } },
            { new: true }
        );
        res.json({ profile, msg: 'Profile Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ msg: 'Server Error' }],
        });
    }
};

// Delete Profile & User
export const deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};
