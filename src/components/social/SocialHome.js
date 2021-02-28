import { useEffect, createContext, memo } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { logoTransparent } from '../../actions/globalActions';
import SocialNavbar from './components/SocialNavbar';

// utilities
import { getCookie, setCookie, deleteCookie } from '../../utilities/cookies';

// routes
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';

// css
import '../css/SocialPage.css';

// redux
import { connect } from 'react-redux';

// context
import SocialContext from './SocialContext';


const Refresh = () => {
  return (
    <Redirect to="/social" />
  )
}

const SocialHome = memo(({global: {user}}) => {

  const { pathname } = useLocation();

  useEffect(() => {
    logoTransparent(true);
  }, []);
  
  if (user !== undefined) {

    const path = pathname.split('/');
    const Routes = ! user ? 
    <>
      <Route path="/social/login" component={Login} />
      <Route path="/social/signup" component={Signup} />
      {(!['login', 'signup'].includes(path[2]) || path.length >= 3) && <Redirect to="/social/login" />}
    </> : 
    <>
      <Route exact path="/social" component={Home} />
      <Route exact path="/social/home" component={Refresh} />
      {!['home', 'login', 'signup'].includes(path[2]) && <Route path="/social/:id" component={Profile} />}
      {['login', 'signup'].includes(path[2]) && <Redirect to="/social" />}
    </>

    return (
      <SocialContext.Provider value={{ user }}>
        <div className="Social-master-container">
          {Routes}
        </div>
        <SocialNavbar />
      </SocialContext.Provider>
    );
  }

  else return (
    <div className="Social-master-container">
      loading
    </div>
  );

});

const mapStateToProps = state => ({
  global: state.global
});

export default connect(mapStateToProps)(SocialHome);
