import axios from 'axios';
import React, { useState, useEffect } from 'react'
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

  const [backendActive, setBackendActive] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
        data: {bearer: getCookie('bearer')}
      });
      if (!res.data.success) {
        deleteCookie('bearer');
      }
      else {
        auth(getCookie('bearer'));
        console.log(getCookie('bearer'));
      }
      setBackendActive(true);
    }
    verifyAuth();
  }, []);

  return (
    <Provider store={store} >
      <Router>
        <NavBar />
        <div className="app-master-container" style={{backgroundColor: 'rgb(108, 146, 108)', backgroundImage:"url(/images/background4.jpg)"}} onClick={closeNav}>
          {!backendActive && <Spinner/>}
          {backendActive && <Pages/>}
          <MiniSocial />
          <About />
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
