import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import Post from './Post';

const AppendPosts = ({ appendedPosts }) => {

  const postContainer = document.getElementById("SOCIAL-appended-posts-container");
  if (postContainer) return createPortal(
    <>
      {appendedPosts && appendedPosts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </>,
    postContainer
  )
  return <></>;

}

export default memo(AppendPosts);