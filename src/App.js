import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Spinner from './components/ui/Spinner';
import Pages from './components/ui/Pages'
import MiniSocial from './components/mini social/MiniSocial'
import About from './components/ui/About'
import Footer from './components/ui/Footer'

// css
import './app.css';

// utilities
import { getCookie, deleteCookie } from './utilities/cookies';

// redux
import { Provider } from 'react-redux'
import store from './store'

import { closeNav, auth } from './actions/globalActions'

const App = () => {

  const [loading, setLoading] = useState(undefined);

  let timeout;

  useEffect(() => {
    const verifyAuth = async () => {
      let temp = false;
      timeout = setTimeout(() => {
        setLoading(true);
        temp = true;
      }, 500);
      let res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
        headers: {'bearer': getCookie('bearer')}
      });
      if (!res.data.success) {
        auth(null);
        deleteCookie('bearer');
      }
      else {
        console.log(res.data.user);
        auth(res.data.user);
      }
      clearTimeout(timeout);
      if (temp) setTimeout(() => {
        setLoading(false);
      }, 1000);
      else setLoading(false);
    }
    verifyAuth();
  }, []);

  return (
    <Provider store={store} >
      <Router>
        <NavBar />
        <div className="app-master-container" style={{backgroundColor: 'rgb(108, 146, 108)', backgroundImage:"url(/images/background4.jpg)"}} onClick={closeNav}>
          {loading && <Spinner/>}
          {!loading && <Pages/>}
          <MiniSocial />
          <About />
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
