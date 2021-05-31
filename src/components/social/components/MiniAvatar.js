// import React from 'react';
import { Link } from 'react-router-dom';
import ProfileTinyImage from './ProfileTinyImage';

const MiniAvatar = ({ user, profile, name=true }) => {
  return (
    <div className={`f ${name ? 'p-t-10' : 'p-y-10'}`}>
      <ProfileTinyImage user={user} />
      {name && <div className="SOCIAL-mini-avatar-secondary-container">
        <div className="SOCIAL-mini-avatar-secondary-text-container">
          {!profile && <div className="SOCIAL-mini-avatar-usertext">{user.firstName} {user.lastName}</div>}
          {profile && <>
            {(user.firstName === profile.firstName) && <div className="SOCIAL-mini-avatar-usertext t-style-none">
              <Link to={`/social/refresh/${user._id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </div>}
            {(user.firstName !== profile.firstName) && <div className="SOCIAL-mini-avatar-usertext t-style-none">
              <Link to={`/social/refresh/${user._id}`}>
                {user.firstName} {user.lastName}
              </Link>
              <i className="m-l-5 fas fa-angle-right m-r-5"></i>
              <Link to={`/social/refresh/${profile._id}`}>
              {profile.firstName} {profile.lastName}
              </Link>
            </div>}
          </>}


        </div>

      </div>}
    </div>
  )
}

export default MiniAvatar
