const gravatar = require('gravatar');

const Profile = require('../models/Profile');
const User = require('../models/User');

// Get Curr Profile

const getCurrProfile = async (req, res) => {
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

// Get individual Profile by User Id
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.id,
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

// Get individual Profile
const getProfileByUserName = async (req, res) => {
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
const getAllProfile = async (req, res) => {
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
const updateProfile = async (req, res) => {
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

            const newProfile = new Profile({
                user: req.user.id,
                bio: bio ? bio : '',
                DOB: DOB && DOB,
                name,
                profileImg: profileImg ? profileImg : avatar,
                followers: [],
                following: [],
            });
            await newProfile.save();
            return res.json({ profile: newProfile, msg: 'Profile Created' });
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
const deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Add Follower
const addFollower = async (req, res) => {
    try {
        const followUser = await User.findById(req.params.id);
        if (!followUser)
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });

        const profile = await Profile.findOne({ user: req.user.id });

        if (
            profile.following.filter(
                (user) => user.user.toString() === req.params.id
            ).length > 0
        )
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Already a Follower',
                    },
                ],
            });

        profile.following.push({ user: req.params.id });
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Add Following
const addFollowing = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id });
        if (!profile)
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });
        if (
            profile.followers.filter(
                (user) => user.user.toString() === req.user.id
            ).length > 0
        )
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Already Following ',
                    },
                ],
            });

        profile.followers.push({ user: req.user.id });
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Remove Follower
const removeFollower = async (req, res) => {
    try {
        const followUser = await User.findById(req.params.id);
        if (!followUser)
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });

        const profile = await Profile.findOne({ user: req.user.id });

        if (
            profile.following.filter(
                (user) => user.user.toString() === req.params.id
            ).length === 0
        )
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Follow the User First to Remove',
                    },
                ],
            });

        profile.following = profile.following.filter(
            (user) => user.user.toString() !== req.params.id
        );
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Remove Follower
const removeFollowing = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id });
        if (!profile)
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });
        if (
            profile.followers.filter(
                (user) => user.user.toString() === req.user.id
            ).length === 0
        )
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Follow to Unfollow the user ',
                    },
                ],
            });

        profile.followers = profile.followers.filter(
            (user) => user.user.toString() !== req.user.id
        );
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = {
    removeFollowing,
    removeFollower,
    addFollowing,
    addFollower,
    deleteProfile,
    updateProfile,
    getAllProfile,
    getProfileByUserName,
    getProfileById,
    getCurrProfile,
};
