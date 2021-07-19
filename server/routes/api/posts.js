const express = require('express');
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

const {
    getAllPost,
    postPost,
    getPostById,
    getAllPostByUser,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    deleteComment,
    postComment,
    updateComment,
    likeComment,
    unlikeComment,
    savePost,
    savedPost,
    removeSavedPost,
} = require('../../controllers/posts');

const router = express.Router();

// @route       Get api/posts
// @description Get all posts
// @access      Public
router.get('/', getAllPost);

// @route       Get api/posts/:id
// @description Get post by Post Id
// @access      Public
router.get('/:id', getPostById);

// @route       Get api/posts/user/:userId
// @description Get all posts by User Id
// @access      Public
router.get('/user/:userId', getAllPostByUser);

// @route       Post api/posts
// @description Post post
// @access      Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    postPost
);

// @route       Update api/posts/:id
// @description Update post by post id
// @access      Private
router.put('/:id', auth, updatePost);

// @route       Delete api/posts/:id
// @description Delete post by post id
// @access      Private
router.delete('/:id', auth, deletePost);

// @route       Like api/posts/like/:id
// @description Like post by post id
// @access      Private
router.put('/like/:id', auth, likePost);

// @route       Unlike api/posts/like/:id
// @description Like post by post id
// @access      Private
router.put('/unlike/:id', auth, unlikePost);

// @route       PUT api/posts/comments/:id/
// @description Post a comment under a post
// @access      Private
router.put(
    '/comments/:id',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    postComment
);

// @route       PUT api/posts/comments/update/:id/:commentId
// @description Update a comment under a post
// @access      Private
router.put(
    '/comments/update/:id/:commentId',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    updateComment
);

// @route       Post api/posts/comments/delete/:id/:commentId
// @description Delete comment by post & comment id
// @access      Private
router.delete('/comments/delete/:id/:commentId', auth, deleteComment);

// @route       PUT api/posts/comments/like/:id/:commentId/
// @description Like comment by comment id
// @access      Private
router.put('/comments/like/:id/:commentId', auth, likeComment);

// @route       PUT api/posts/comments/unlike/:id/:commentId/
// @description Unlike comment by comment id
// @access      Private
router.put('/comments/unlike/:id/:commentId', auth, unlikeComment);

router.get('/saved/all', auth, savedPost);

router.put('/saved/:id', auth, savePost);

router.put('/saved/remove/:id', auth, removeSavedPost);

module.exports = router;
