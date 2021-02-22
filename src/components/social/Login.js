import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import { setCookie } from '../../utilities/cookies';

// redux
import { auth } from '../../actions/globalActions';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setState = {
    "email": setEmail,
    "password": setPassword
  }

  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/auth/login`,
      data: {
        email,
        password
      }
    });

    if (res.data.success) {
      console.log(res.data.bearer);
      setCookie('bearer', res.data.bearer, 100);
      auth(res.data.bearer);
    } else {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  }

  const formHandler = e => {
    setState[e.target.name](e.target.value);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#FFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {loading && <Spinner />}
      <form onSubmit={submitHandler}>
        <input onChange={formHandler} value={email} name="email" type="email" placeholder="email"/>
        <input onChange={formHandler} value={password} name="password" type="password" placeholder="password" minLength="6"/>
        <input type="submit" value="Login"/>
        <Link to='/social/signup'>Signup</Link>
      </form>

    </div>
  )
}

export default Login
