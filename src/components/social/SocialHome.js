import { useEffect, memo, lazy, Suspense } from 'react';
import { Route, Redirect, useLocation, useParams } from 'react-router-dom';
import { logoTransparent } from '../../actions/globalActions';
import SocialNavbar from './components/SocialNavbar';

// css
import '../css/SocialPage.css';
import '../css/SocialCreatePost.css';

// redux
import { connect } from 'react-redux';

// context
import SocialContext from './SocialContext';

// lazy
const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));
const Home = lazy(() => import('./Home'));
const Profile = lazy(() => import('./Profile'));
const News = lazy(() => import('./News'));

const Refresh = () => {

  const { route } = useParams();

  return (
    <Redirect to={`/social/${route}`} />
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
    <Suspense fallback={<div>Loading...</div>}>
      <Route path="/social/login" component={Login} />
      <Route path="/social/signup" component={Signup} />
      {(!['login', 'signup'].includes(path[2]) || path.length >= 3) && <Redirect to="/social/login" />}
    </Suspense> : 
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/social" component={Home} />
      <Route exact path="/social/news" component={News} />
      <Route exact path="/social/refresh/:route" component={Refresh} />
      {!['news', 'refresh', 'login', 'signup'].includes(path[2]) && <Route path="/social/:id" component={Profile} />}
      {['login', 'signup'].includes(path[2]) && <Redirect to="/social" />}
    </Suspense>

    return (
      <SocialContext.Provider value={{ user }}>
        <div className="Social-master-container fade-in">
          {Routes}
        </div>
        {user && <SocialNavbar />}
      </SocialContext.Provider>
    );
  }

  else return (
    <div className="Social-master-container fade-in">
      loading
    </div>
  );

});

const mapStateToProps = state => ({
  global: state.global
});

export default connect(mapStateToProps)(SocialHome);
