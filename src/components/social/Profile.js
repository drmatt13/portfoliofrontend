import React, { useState, useEffect, useRef, useContext, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PostButton from './components/PostButton';
import Posts from './components/Posts';
import ContainerPortal from '../ui/ContainerPortal';
import UpdateImageContainer from './components/UpdateImageContainer';
import ProfileImage from './components/ProfileImage';

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
  const [containerPortal, showContainerPortal] = useState(false);

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
    document.getElementById("app-master-container").scrollTo({top: 0, behavior: 'smooth'});
  }, [id])


  const updateProfileImage = () => {
    showContainerPortal(true);
  }

  return <>
    <div className="f f-d-column f-a-center" >
      <Link to="/social" ref={redirectRef}></Link>
      {!loading && <div className="SOCIAL-profile-master-container f f-d-column f-a-center">
        <VerifyUser/> 

        <div className="SOCIAL-profile-header-container">
          <ProfileImage user={profile.user} />
          <h2 className="SOCIAL-profile-header-name">
            {profile.user.firstName} {profile.user.lastName}
          </h2>
        </div>


        <div className="SOCIAL-profile-options-container">
          <button>Edit Profile</button>
          <button>Add/Remove Friend</button>
          <button>Add/Remove Follower</button>
          <button>Message</button>
          {user._id == id && <button onClick={updateProfileImage}>Change Profile Image</button>}
          <button>View Friends/Followers</button>
        </div>

        <div className="SOCIAL-profile-bio-container">
          <p>BIO: Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem adipisci amet illum culpa debitis. Numquam, dolores suscipit sequi quisquam, quia atque ab minima aliquam autem architecto sunt animi. Provident, ullam?</p>
        </div>

        <div className="SOCIAL-posts-content-master-container f f-d-row">

          {/* NEWS */}
          <div className="SOCIAL-posts-container f-4 p-x-10">
              <div className="p-t-25 sticky a-t-0">
                <Posts news={true} />
              </div>
            </div>

          {/* POSTS */}
          <div className="SOCIAL-posts-container relative f f-d-column f-a-center f-4 p-x-10 p-t-25">
            <PostButton user={user} profile={profile} />
            <div id="SOCIAL-appended-posts-container" />
            <Posts profile={profile} news={false} />
          </div>

          {/* ADS */}
          <div className="SOCIAL-ad-container f-3 m-t-25 m-l-10 bg-green-600"></div>

          {/* UpdateImageContainer */}
          {containerPortal && <ContainerPortal showContainerPortal={showContainerPortal}>
            <UpdateImageContainer id={id} showContainerPortal={showContainerPortal} />
          </ContainerPortal>}
        </div>
      </div>}
    </div>
  </>
}



export default Profile;
