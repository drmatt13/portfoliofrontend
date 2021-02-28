import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import Post from './Post';

// utilities
import { getCookie } from '../../../utilities/cookies';

const Posts = ({ profile }) => {

  const [posts, setPosts] = useState([]);
  const [appendedPosts, setAppendedPosts] = useState([]);

  const appendPost = (post) => {
    setAppendedPosts([post, ...appendedPosts]);
  }

  const fetchPosts = async () => {
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/social/${profile.user._id}/post`,
      headers: { bearer: getCookie('bearer') }
    });
    setPosts(res.data.posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map(post => (
        <Post key={post._id} post={post} appendPost={appendPost} />
      ))}
    </>
  )
}

export default Posts
