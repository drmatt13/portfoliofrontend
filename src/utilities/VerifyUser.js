import { useEffect } from 'react'
import axios from 'axios';
import { auth } from '../actions/globalActions';
import { getCookie, deleteCookie } from './cookies';

const VerifyUser = () => {

  useEffect(() => {
    const getUser = async () => {
      let res = await axios(
      {
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
        headers: {'bearer': getCookie('bearer')}
      });
      if (!res.data.success) {
        auth(null);
        deleteCookie('bearer');
      }
      console.log(res);
    }
    getUser();
  }, []);

  return <></>;
}

export default VerifyUser;
