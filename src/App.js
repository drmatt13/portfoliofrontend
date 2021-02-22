import axios from 'axios';
import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Parrallax from './components/ui/Parrallax'
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

  useEffect(() => {
    const verifyAuth = async () => {
      if (getCookie('bearer')) {
        const res = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
          data: {bearer: getCookie('bearer')}
        });
        console.log(res);
        if (!res.data.success) {
          deleteCookie('bearer');
          console.log('cookie deleted');
        }
        else {
          auth(getCookie('bearer'));
          console.log(getCookie('bearer'));
        }
      }
    }
    verifyAuth();
  }, []);

  return (
    <Provider store={store} >
      <Router>
        <NavBar />
        <Parrallax background="/images/background4.jpg">
          <div 
            className="app-master-container" 
            onClick={closeNav}
          >
            <Pages />
            <MiniSocial />
            <About />
          </div>
        </Parrallax>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
