import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PostButton from './components/PostButton';
import Posts from './components/Posts';

// utilities
import { getCookie } from '../../utilities/cookies';
import VerifyUser from '../../utilities/VerifyUser';

// css
import '../css/SocialProfile.css';

// context
import SocialContext from './SocialContext';

const Profile = () => {

  const { user } = useContext(SocialContext);

  const redirectRef = useRef();

  const { id } = useParams();

  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    let res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/social/${id}`,
      headers: {'bearer': getCookie('bearer')}
    });
    if (!res.data.success) return redirectRef.current.click();
    setProfile(res.data);
    setLoading(false);
  }

  useEffect(() => {
    if (!profile) document.title = "Profile | Social";
    else document.title = `${profile.user.firstName} ${profile.user.lastName} | Social`;
  })

  useEffect(() => {
    getUser();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [id])

  return (
    <>
      <Link to="/social" ref={redirectRef}></Link>
      {!loading && <div className="SOCIAL-profile-master-container">
        <VerifyUser/> 

        <div className="SOCIAL-profile-header-container">
          <div className="SOCIAL-profile-header-profile-image"></div>
          <h2 className="SOCIAL-profile-header-name">
            {profile.user.firstName} {profile.user.lastName}
          </h2>
        </div>

        {/* <Link to="/social">Home</Link> */}

        <div className="SOCIAL-profile-options-container">
          <button>Edit Profile</button>
          <button>Add/Remove Friend</button>
          <button>Add/Remove Follower</button>
          <button>Message</button>
          <button>Photos</button>
          <button>View Friends/Followers</button>
        </div>

        <div className="SOCIAL-profile-bio-container">
          <p>BIO: Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem adipisci amet illum culpa debitis. Numquam, dolores suscipit sequi quisquam, quia atque ab minima aliquam autem architecto sunt animi. Provident, ullam?</p>
        </div>

        <PostButton user={user} profile={profile} />


        <div className="SOCIAL-posts-container">
        <div id="SOCIAL-appended-posts-container" />
          <Posts profile={profile} />
        </div>
      </div>}
    </>
  )
}

export default Profile
