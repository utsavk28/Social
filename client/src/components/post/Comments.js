import React from 'react';
import Comment from './Comment';

const Comments = ({ onPostPage = false, post }) => {
    const { comments } = post;

    return (
        <div className='comments-tab my-4 mx-2'>
            {!onPostPage ? (
                <div>
                    {comments.slice(0, 3).map((comment) => (
                        <Comment
                            post={post}
                            key={comment._id}
                            comment={comment}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {comments.map((comment) => (
                        <Comment
                            post={post}
                            key={comment._id}
                            comment={comment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;
