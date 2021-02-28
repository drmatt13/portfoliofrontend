import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// utilities
import { getCookie } from '../../../utilities/cookies';

const Post = ({ post: { userId, profileId, postContent } }) => {

  const [users, setUsers] = useState();
  const [order, setOrder] = useState();

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
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      if (users.length !== 2) setOrder([0, 0]);
      else profileId !== users[0]._id ? setOrder([0, 1]) : setOrder([1, 0]);
    }
  }, [users])

  return (
    <div>
      {!order && <div>loading...</div>}
      {order && <div style={{backgroundColor: '#F003', marginTop: '5px'}}>
        {users.length !== 2 && <div>
          <Link to={`/social/${users[order[0]]._id}`}>
            {users[order[0]].firstName} {users[order[0]].lastName}
          </Link>
        </div>}
        {users.length === 2 && <div>
          <Link to={`/social/${users[order[0]]._id}`}>{users[order[0]].firstName} {users[order[0]].lastName}</Link> 
          {' -> '} 
          <Link to={`/social/${users[order[1]]._id}`}>{users[order[1]].firstName} {users[order[1]].lastName}</Link>
        </div>}
        <div>{postContent}</div>
      </div>}
    </div>
  )
}

export default Post
