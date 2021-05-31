

import React, { useState, useEffect, useRef, useContext } from 'react';
import PostButton from './components/PostButton';
import Posts from './components/Posts';


import VerifyUser from '../../utilities/VerifyUser';

// css
import '../css/SocialProfile.css';

// context
import SocialContext from './SocialContext';


const News = () => {

  const { user } = useContext(SocialContext);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="f f-d-column f-a-center">
      <VerifyUser/> 
      {user.admin && <PostButton user={user} profile={{ myProfile:true }} news={true} />}
      <Posts />
    </div>
  )
}

export default News
