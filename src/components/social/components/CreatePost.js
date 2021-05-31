import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import Spinner from '../../ui/Spinner';
import MiniAvatar from './MiniAvatar';

// utilities
import { getCookie } from '../../../utilities/cookies';


const getWord = () => {
  const node = document.getSelection();
  const textContent = node.focusNode.textContent;
  let left = node.anchorOffset,
      right = left;
  while (!!!textContent.charAt(left-1).match(/^$|\s+/)) left--;
  while (!!!textContent.charAt(right).match(/^$|\s+/)) right++;
  return { substring: textContent.substring(left, right), left, right };
}

const checkLink = word => {
  if (word.length >= 7) {
    const substring = word.substring(0, 7);
    if ('http://' === substring || 'https://' === substring+'/') return true;
  }
  return false;
}

const CreatePost = ({ showContainerPortal, user, profile, appendPost, news }) => {

  const [placeHolder, setPlaceHolder] = useState("What's on your mind?");
  const [postContent, setPostContent] = useState('');
  const [sendingPost, setSendingPost] = useState(false);

  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(10);
  
  const [ogLink, setOgLink] = useState();
  const [metadata, setMetadata] = useState(); 
  const postRef = useRef();

  useEffect(() => {
    // Tab name
    if (!profile.myProfile) setPlaceHolder(`Write something to ${profile.user.firstName} ${profile.user.lastName}...`);

    // DIV
    postRef.current.focus();
    postRef.current.addEventListener('input', e => {
      setPostContent(postRef.current.innerHTML);
      const word = getWord();
      if (checkLink(word.substring)) setOgLink(word.substring);
    });
  }, [])

  const getMetadata = async (url) => {
    if (!ogLink) return;
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/social/metadata`,
      headers: { url }
    });
    if (res.data.success) {
      setImageError(false);
      setMetadata(res.data.metadata);
      setLoading(10);
      setOgLink(undefined);
    }
    else {
      setLoading(10);
      setOgLink(undefined);
      setMetadata(undefined);
    }
  }

  useEffect(() => {
    if (ogLink) {
      setLoading(9);
    }
  }, [ogLink]);

  useEffect(() => {
    console.log(loading);
    let interval;
    if (10 > loading && loading > 0) interval = setInterval(() => {
      setLoading(loading => loading - 1);
    }, 150);
    else {
      clearInterval(interval);
      getMetadata(ogLink);
    }
    return () => {
      clearInterval(interval);
    }
  }, [loading])

  const createPost = async () => {
    setSendingPost(true);
    
    const data = metadata ? {
      profileId: profile.user._id,
      postContent, 
      ogMetadata: JSON.stringify(metadata)
    } : {
      profileId: profile.user._id,
      postContent, 
    };

    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/social/${profile.user._id}/post`,
      data,
      headers: {bearer: getCookie('bearer')}
    });
    if (!res.data.success) return console.log('Post failed');
    appendPost(res.data.post);
    showContainerPortal(false);
  }

  const createNews = async () => {
    setSendingPost(true);

    const data = metadata ? {
      postContent, 
      ogMetadata: JSON.stringify(metadata)
    } : {
      postContent, 
    };

    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/social/news`,
      data,
      headers: {bearer: getCookie('bearer')}
    });
    if (!res.data.success) return console.log('Post failed');
    console.log({success:res.data});
    showContainerPortal(false);
  }

  const onClickHandler = () => {
    showContainerPortal(false);
  }

  const removeMetadata = () => {
    setMetadata(undefined);
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    if (news) createNews();
    else createPost();
  }

  return <>

    {sendingPost && <div>creating post...</div>}
    {!sendingPost && <div className="SOCIAL-post-master-container fade-in">

      <div className="SOCIAL-post-header">
        <div className="SOCIAL-post-header-exit" onClick={onClickHandler}>
          <i className="fas fa-times-circle" />
        </div>
        <h2>Create Post</h2>
        <MiniAvatar user={user} />
      </div>
      <div className="SOCIAL-post-secondary-container f f-d-column relative">
        {!!!postContent && <span className="SOCIAL-post-form-placeholder">{placeHolder}</span>}
        <div className="SOCIAL-post-form f-1" ref={postRef} contentEditable="plaintext-only" />

        <div className="relative bg-gray-300 b-r-15 m-t-10">
          {10 > loading && <div className="SOCIAL-post-og-image" ><Spinner/></div>}
          {(metadata && loading === 10) && <>
            <div className="SOCIAL-post-og-container-exit" onClick={removeMetadata}>
              <i className="fas fa-times-circle" />
            </div>
            {!imageError && <div className="SOCIAL-post-og-image">
              <img src={metadata.image} alt="og-image" onError={() => {setImageError(true)}}/>
            </div>}
            <div className={`SOCIAL-post-og-info-container ${imageError ? "REACT-padding-top-20" : ""}`}>
              <div className="SOCIAL-post-og-source">{metadata.source}</div>
              <h4 className="SOCIAL-post-og-title">{metadata.title}</h4>
            </div>
          </>}
        </div>
        
      </div>
      <button
        className="SOCIAL-post-submit-btn" 
        disabled={(!metadata && (!!!postContent || 10 > loading))}
        onClick={onSubmitHandler} 
      >Post</button>
    </div>}

  </>
}

export default CreatePost
