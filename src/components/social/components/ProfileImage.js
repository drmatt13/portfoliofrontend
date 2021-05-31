import React, { useState, useEffect, memo } from 'react'
import defaultImage from '../../images/defaultProfile.jpg';


const ProfileImage = ({user}) => {

  const [profileImage, setProfileImage] = useState(defaultImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.profileImage) setProfileImage(`https://drmatt13-social-bucket.s3.us-east-2.amazonaws.com/p-${user._id}.jpg?V${'version'}`);
    setLoading(false);
  }, []);

  return (
    <div className="SOCIAL-profile-header-profile-image">
      {loading && <div>loading...</div>}
      {!loading && <img src={profileImage} alt="profile-picture" />}
    </div>
  )
};

export default ProfileImage;