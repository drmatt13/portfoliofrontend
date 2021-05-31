import React, { useContext } from 'react';
import '../../css/SocialNavbar.css';
import { Link } from 'react-router-dom';


// context
import SocialContext from '../SocialContext';

const SocialNavbar = () => {

  const { user } = useContext(SocialContext);

  return (
    <div className="Social-navbar-master-container f f-d-row f-a-center f-j-space-around fade-in t-style-none">
      <Link to={`/social/refresh/${user['_id']}`}><div><i className="fas fa-home"></i></div></Link>
      <Link to="/social/refresh/news"><div><i className="far fa-newspaper"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="fas fa-search"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="fas fa-globe-americas"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="far fa-map"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="far fa-comment"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="far fa-bell"></i></div></Link>
      <Link to="/social/refresh/home"><div><i className="fas fa-cog"></i></div></Link>
    </div>
  )
}

export default SocialNavbar
