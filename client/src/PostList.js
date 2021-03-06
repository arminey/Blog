import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);
    const renderPosts = Object.values(posts).map(post => {
        return (
            <div
                className='card'
                style={{ width: '30%', marginBottom: '20px' }}
                key={post.id}
            >
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <p className="font-italic">{post.comments.length} comments.</p>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div className='d-flex flex-raw flex-wrap justify-content-between'>
            {renderPosts}
        </div>
    );
}
