import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import AppList from './AppList';
import AppPage from './AppPage';
import ReactAppPage from './ReactAppPage';
import { logoTransparent } from '../../actions/globalActions';

const AppsHome = () => {

  useEffect(() => {
    logoTransparent(false);
  }, []);

  return (
    <>
      <Route exact path="/apps" component={AppList} />
      <Route exact path="/apps/:collection/:app" component={AppPage} />
      <Route exact path="/apps/react/:app" component={ReactAppPage} />
    </>
  )
}

export default AppsHome;
