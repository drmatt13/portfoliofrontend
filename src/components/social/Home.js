import React, { useEffect } from 'react';
import axios from 'axios';

// utilities
import { getCookie, setCookie, deleteCookie } from '../../utilities/cookies';

// redux
import { auth } from '../../actions/globalActions';

const Home = () => {

  useEffect(() => {
    const getActiveUser = async () => {
      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
        data: {bearer: getCookie('bearer')}
      });
      console.log(res.data.user);
    }
    getActiveUser();
  }, []);

  const logout = () => {
    deleteCookie('bearer');
    auth(null);
  }

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#FFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home
