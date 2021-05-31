import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MiniAvatar from './MiniAvatar';

// utilities
import { getCookie } from '../../../utilities/cookies';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const Post = ({ post: { userId, profileId, postContent, ogMetadata }, news }) => {

  const [users, setUsers] = useState();
  const [order, setOrder] = useState();
  const [metadata, setMetadata] = useState();

  const fetchUsers = async () => {
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/social/users`,
      data: {users: JSON.stringify([userId, profileId])},
      headers: { bearer: getCookie('bearer') }
    });
    setUsers(res.data.users);
  }

  useEffect(() => {
    if (!!ogMetadata) setMetadata(JSON.parse(ogMetadata));
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      if (users.length !== 2) setOrder([0, 0]);
      else profileId !== users[0]._id ? setOrder([0, 1]) : setOrder([1, 0]);
    }
  }, [users])

  return (
    <div className={`SOCIAL-post-container b-r-10 m-b-15 box-shadow-1 fade-in ${news ? 'NEWS' : ''}`}>
      {!order && <div>loading...</div>}
      {order && <>
        {!news && <div className="SOCIAL-post-header-container p-10 p-t-0 mini-scroll blue-scroll">
          {(users && !news) && <MiniAvatar user={users[order[0]]} profile={users[order[1]]} />}
          <div className="m-t-10 m-b-5 t-lg">{postContent}</div>
        </div>}
        {metadata && <>

          <div className="SOCIAL-feed-og-container relative pointer fade-in" onClick={() => openInNewTab(metadata.url)}>
              {metadata.image && <div className="SOCIAL-feed-og-image">
                <img src={metadata.image} alt="og-image"/>
              </div>}
              <div className={`SOCIAL-feed-og-info-container`}>
                <div className="SOCIAL-feed-og-source">{metadata.source}</div>
                <h4 className="p-y-2.5">{metadata.title}</h4>
              </div>
          </div>

        </>}

        {!news && <div className="SOCIAL-post-footer-container f f-j-space-evenly f-a-center p-t-5 no-select">
          <div><i className="far fa-thumbs-up"></i>⠀Like</div>
          <div><i className="far fa-comment"></i>⠀Comment</div>
          <div><i className="fas fa-share"></i>⠀Share</div>
        </div>}

      </>}
    </div>
  )
}

export default Post
