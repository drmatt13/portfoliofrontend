import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import { setCookie } from '../../utilities/cookies';

// redux
import { auth } from '../../actions/globalActions';

const Login = () => {

  const checkboxRef = useRef();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])

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

    const checked = checkboxRef.current.checked ? true : false;

    if (res.data.success) {
      if (checked) setCookie('bearer', res.data.bearer, 1000);
      else setCookie('bearer', res.data.bearer);
      auth(res.data.user);
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {loading && <Spinner />}
      <form onSubmit={submitHandler}>
        <input onChange={formHandler} value={email} name="email" type="email" placeholder="email"/>
        <input onChange={formHandler} value={password} name="password" type="password" placeholder="password" minLength="6"/>
        <input ref={checkboxRef} type="checkbox"/>
        <input type="submit" value="Login"/>
        <Link to='/social/signup'>Signup</Link>
      </form>

    </div>
  )
}

export default Login
