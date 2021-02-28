import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import AppendPosts from './AppendPosts';

// utilities
import { getCookie } from '../../../utilities/cookies';

const containerDiv = document.getElementById('container');
const appDiv = document.getElementById('app');

const getWord = () => {
  const node = document.getSelection();
  const textContent = node.focusNode.textContent;

  let left = node.anchorOffset,
      right = left;

  while (!!!textContent.charAt(left-1).match(/^$|\s+/)) left--;
  while (!!!textContent.charAt(right).match(/^$|\s+/)) right++;

  return textContent.substring(left, right);
}

const checkLink = word => {
  if (word.length >= 7) {
    const substring = word.substring(0, 7);
    if ('http://' === substring || 'https://' === substring+'/') return true;
  }
  return false;
}

const CreatePost = ({ setCreatePost, user, profile, appendPost }) => {

  const [placeHolder, setPlaceHolder] = useState("What's on your mind?");
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [ogLink, setOgLink] = useState();

  const postRef = useRef();

  useEffect(() => {
    // Tab name
    if (!profile.myProfile) setPlaceHolder(`Write something to ${profile.user.firstName} ${profile.user.lastName}...`);
    // freeze page
    const pageYOffset = window.pageYOffset;
    appDiv.style.marginTop = `-${pageYOffset}px`;
    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'scroll';
    //
    postRef.current.addEventListener("DOMCharacterDataModified", e => {
      setPostContent(e.newValue);
      const word = getWord();
      if (checkLink(word)) setOgLink(word);
    });
    return () => {
      appDiv.style.marginTop = `0`;
      document.body.style.position = 'static';
      document.body.style.overflowY = 'auto';
      window.scrollTo(0, pageYOffset);
    }
  }, [])

  useEffect(() => {
    if (ogLink) console.log(ogLink);
  }, [ogLink]);

  const createPost = async () => {
    setLoading(true);
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/social/${profile.user._id}/post`,
      data: {
        profileId: profile.user._id,
        postContent, 
        // ogImage:,
      },
      headers: {bearer: getCookie('bearer')}
    });
    if (!res.data.success) return console.log('Post failed');
    appendPost(res.data.post);
    setCreatePost(false);
  }

  const onClickHandler = () => {
    setCreatePost(false);
  }

  const onChangeHandler = e => {
    // setPostContent(e.target.value);
    console.log(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    createPost();
  }

  return createPortal(
    <>
      <div
      style={{
        backgroundColor: '#0003',
        position: 'fixed',
        height: '100vh',
        width: '100%',
        zIndex: '25',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {loading && <div>creating post...</div>}
        {!loading && <>
          <div 
          onClick={onClickHandler}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%'
          }}></div>
          <div 
          style={{
            backgroundColor: '#FFF',
            zIndex: '11',
            width: '500px'
          }}>
            <>



              <h2>Create Post</h2>
              <h4>{user.firstName} {user.lastName}</h4>
              <form onSubmit={onSubmitHandler}>
                
                <div className="Social-post-form" ref={postRef} contentEditable="plaintext-only" />
                <div className="Social-post-og-container">
                  <div className="Social-post-og-header">og header</div>
                  <div className="Social-post-og-image">og image</div>
                  <div className="Social-post-og-desc">og desc</div>
                </div>

                <input className="Social-post-submit-btn" type="submit" value="Post"/>
              </form>


            </>
          </div>
        </>}

      </div>
    </>, containerDiv
  )
}

const PostButton = ({ user, profile }) => {

  const [createPost, setCreatePost] = useState(false);
  const [appendedPosts, setAppendedPosts] = useState([]);

  const appendPost = (post) => {
    setAppendedPosts([post, ...appendedPosts]);
  }

  const onClickHandler = () => {
    setCreatePost(true);
  }

  return (
    <>
      <div style={{backgroundColor: '#0003', display: 'flex', flexDirection: 'row'}}>
        <div>{user.firstName} {user.lastName}</div>
        <button onClick={onClickHandler}>CreatePost</button>
      </div>
      {createPost && <CreatePost setCreatePost={setCreatePost} user={user} profile={profile} appendPost={appendPost} />}
      <AppendPosts appendedPosts={appendedPosts} />
    </>
  )
}

export default PostButton
