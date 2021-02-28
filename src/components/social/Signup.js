import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../ui/Spinner';

// utilities
import { setCookie } from '../../utilities/cookies';

// redux
import { auth } from '../../actions/globalActions';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])

  const setState = {
    "email": setEmail,
    "password": setPassword,
    "firstName": setFirstName,
    "lastName": setLastName
  }

  const submitHandler = async e => {
    e.preventDefault();

    setLoading(true);

    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/auth/register`,
      data: {
        email,
        password,
        firstName,
        lastName
      }
    });
    setLoading(false);
    if (res.data.success) {
      setCookie('bearer', res.data.bearer);
      auth(res.data.user);
    } else {
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
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
      <form onSubmit={submitHandler} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <input onChange={formHandler} value={email} name="email" type="email" placeholder="email" required/>
        <input onChange={formHandler} value={password} name="password" type="password" placeholder="password" minLength="6" required/>
        <input onChange={formHandler} value={firstName} name="firstName" type="text" placeholder="firstName" required/>
        <input onChange={formHandler} value={lastName} name="lastName" type="text" placeholder="lastName" required/>
        <input type="submit" value="Sign Up"/>
        <Link to='/social/login'>Login</Link>
      </form>

    </div>
  )
}

export default Login
