import { useEffect, memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { logoTransparent } from '../../actions/globalActions';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';

// css
import '../css/SocialPage.css';

//redux
import { connect } from 'react-redux';

const SocialHome = memo(({global: {auth}}) => {

  const Routes = 
  ! auth ? 
  <>
    <Route path="/social/login" component={Login} />
    <Route path="/social/signup" component={Signup} />
    <Redirect to="/social/login" />
  </> : 
  <>
    <Route path="/social/home" component={Home} />
    <Redirect to="/social/home" />
  </>;

  useEffect(() => {
    logoTransparent(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

return (
  <div className="Social-master-container">
    {Routes}
  </div>
)
});

const mapStateToProps = state => ({
  global: state.global
});

export default connect(mapStateToProps)(SocialHome);
