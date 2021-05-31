import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Spinner from './components/ui/Spinner';
import Pages from './components/ui/Pages'
import About from './components/ui/About'
import Footer from './components/ui/Footer'

// css
import './app.css';
import './colors.css';

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

  // url(/images/background4.jpg)
  // https://i.lensdump.com/i/mgY2Q.jpg
  // https://images.wallpaperscraft.com/image/moraine_lake_alberta_canada_hdr_93615_2560x1440.jpg
  // https://i.pinimg.com/originals/70/fc/0c/70fc0c9846423ccf3ff8506fd9268233.jpg?q=60
  // https://images.hdqwalls.com/wallpapers/beautiful-mountains-clear-reflection-in-water-em.jpg
  // https://images.alphacoders.com/461/461992.jpg
  // https://cdn.pixabay.com/photo/2016/02/18/22/33/forest-1208296_960_720.jpg
  // https://www.wallpaperflare.com/static/296/630/540/fir-trees-fog-foggy-forest-wallpaper.jpg
  // https://https://wallpaperaccess.com/full/464542.jpg
  // https://safebooru.org//images/2707/d7d73bb4ba90e830a002f6852e4a1f2baf73eafc.gif
  // https://i.pinimg.com/originals/19/6a/d9/196ad9d3122098b297d7b99ce9ff209f.gif
  // https://wallpaperaccess.com/full/1270167.gif
  // http://img1.joyreactor.com/pics/post/full/art-scenery-gif-waterfall-3368027.gif

  // style={{backgroundImage:'url("https://images.wallpaperscraft.com/image/moraine_lake_alberta_canada_hdr_93615_2560x1440.jpg")'}}

  return (
    <Provider store={store} >
      <Router>
        
        <div 
          className="app-master-container" 
          id="app-master-container" 
          onClick={closeNav} 
          style={{
            backgroundImage:'url("https://images.alphacoders.com/461/461992.jpg")'
          }}>
          {loading && <Spinner/>}
          {!loading && <Pages/>}
          <Footer />
        </div>
        <NavBar />
      </Router>
    </Provider>
  )
}

export default App
