import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/defaultProfile.jpg';

const ProfileTinyImage = ({ user }) => {

  const [profileImage, setProfileImage] = useState(defaultImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.profileImage) {
      console.log(user);
      setProfileImage(`https://drmatt13-social-bucket.s3.us-east-2.amazonaws.com/t-${user._id}.jpg`);
    }
    setLoading(false);
  }, []);

  return (
    <div className="SOCIAL-mini-avatar-img-container pointer">
      {loading && <div>loading...</div>}
      <Link to={`./refresh/${user._id}`}>
        {!loading && <img src={profileImage} alt="profile-picture" />}
      </Link>
    </div>
  )
};


export default ProfileTinyImage;