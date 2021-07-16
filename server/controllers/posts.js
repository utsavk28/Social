import { validationResult } from 'express-validator';

import Post from '../models/Post.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import SavedPost from '../models/Saved.js';

// Get all Post
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get Single Post
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Post not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get All Post of User
export const getAllPostByUser = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({
            date: -1,
        });

        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Post a Post
export const postPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { text, img } = req.body;

    try {
        const { username } = await User.findById(req.user.id);
        const { name, profileImg } = await Profile.findOne({
            user: req.user.id,
        });

        const newPost = new Post({
            user: req.user.id,
            text,
            img: img ? img : '',
            name,
            username,
            profileImage: profileImg,
        });

        const post = await newPost.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update a Post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(400).json({ msg: 'Post Not found' });

        if (post.user.toString() !== req.user.id)
            return res.status(400).json({ msg: 'Post Not found' });

        const { text, img } = req.body;

        post.text = text;
        post.img = img;

        const updatedPost = await post.save();

        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Post not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(400).json({ msg: 'Post Not found' });

        if (post.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'User not authorized' });

        await post.remove();

        res.json({ msg: 'Post Removed Successfully' });
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Post not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Like a Post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // check if the post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        )
            return res.status(400).json({
                errors: [
                    {
                        error: 'Post already liked!',
                    },
                ],
            });

        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId')
            return res.status(404).json({ msg: 'Post not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Unlike a Post
export const unlikePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // check if the post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        )
            return res.status(400).json({
                errors: [
                    {
                        error: 'Post has not yet been liked!',
                    },
                ],
            });

        post.likes = post.likes.filter(
            (like) => like.user.toString() !== req.user.id
        );
        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId')
            return res.status(404).json({ msg: 'Page not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Post Comment
export const postComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);
        const profile = await Profile.findOne({ user });
        if (!post)
            return res.status(404).json({
                msg: 'Post Not Found',
            });

        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: profile.name,
            username: user.username,
            profileImage: profile.profileImg,
            likes: [],
            date: Date.now(),
        };

        post.comments = [newComment, ...post.comments];
        await post.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Comment not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update Comment
export const updateComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Comment not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        var post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({
                msg: 'Post Not Found',
            });

        var comment = post.comments.filter(
            (comment) => comment.id === req.params.commentId
        );

        if (!comment)
            return res.status(404).json({
                msg: 'Comment Not Found',
            });

        comment = comment[0];

        if (comment.user.toString() !== req.user.id)
            return res.status(401).json({
                msg: 'Not Authorized',
            });

        post.comments = post.comments.filter(
            (comment) => comment.id !== req.params.commentId
        );

        await post.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Comment not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Like Comment
export const likeComment = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Comment not found' });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Unlike Comment
export const unlikeComment = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId')
            return res.status(400).json({
                errors: [{ msg: 'Comment not found' }],
            });

        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get Saved Post
export const savedPost = async (req, res) => {
    try {
        let savedPost = await SavedPost.findOne({ user: req.user.id });
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });
        }

        if (!savedPost) {
            savedPost = new SavedPost({
                user: req.user.id,
                savedPosts: [],
            });
            await savedPost.save();
        }


        res.json(savedPost);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Save Post
export const savePost = async (req, res) => {
    try {
        let savedPosts = await SavedPost.findOne({ user: req.user.id });
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                errors: [
                    {
                        msg: 'User Not Found',
                    },
                ],
            });
        }

        if (!savedPosts) {
            savedPosts = new SavedPost({
                user: req.user.id,
                savedPosts: [],
            });
            await savedPosts.save();
        }
        

        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({
                errors: [{ msg: 'Post Not Found' }],
            });

        if (
            savedPosts.savedPosts.filter(
                (post) => post._id.toString() === req.params.id
            ).length > 0
        ) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Already Added',
                    },
                ],
            });
        }

        savedPosts.savedPosts.unshift(req.params.id);
        await savedPosts.save();
        res.json(savedPosts);
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server Error' });
    }
};

export const removeSavedPost = async (req, res) => {
    try {
        const savedPosts1 = await SavedPost.findOne({ user: req.user.id });
        if (!savedPosts1)
            return res.status(404).json({
                errors: [{ msg: 'Saved Posts Not Found' }],
            });

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                errors: [{ msg: 'Post Not Found' }],
            });


        if (
            savedPosts1.savedPosts.filter(
                (post) => post._id.toString() === req.params.id
            ).length === 0
        ) {
            console.log('error');
            return res.status(400).json({
                errors: [
                    {
                        msg: "Doesn't Exists",
                    },
                ],
            });
        }

        savedPosts1.savedPosts = savedPosts1.savedPosts.filter(
            (post) => post._id.toString() !== req.params.id
        );

        await savedPosts1.save();
        res.json(savedPosts1);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};
