import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// utilities
import VerifyUser from '../../utilities/VerifyUser';
import { deleteCookie } from '../../utilities/cookies';

// redux
import { auth } from '../../actions/globalActions';

// context
import SocialContext from './SocialContext';

const Home = () => {

  const { user } = useContext(SocialContext);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])

  const logout = () => {
    deleteCookie('bearer');
    auth(null);
  }

  return (
    <>
    <VerifyUser/>
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Link to={`/social/${user['_id']}`} >Profile</Link>
        <button onClick={logout}>logout</button>
      </div>
    </>
  )
}

export default Home
