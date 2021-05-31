import { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// redux
import { logoTransparent } from '../../actions/globalActions';

// lazy
const AppList = lazy(() => import('./AppList'));
const AppPage = lazy(() => import('./AppPage'));
const ReactAppPage = lazy(() => import('./ReactAppPage'));

const AppsHome = () => {

  useEffect(() => {
    logoTransparent(false);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/apps" component={AppList} />
      <Route exact path="/apps/:collection/:app" component={AppPage} />
      <Route exact path="/apps/react/:app" component={ReactAppPage} />
    </Suspense>
  )
}

export default AppsHome;
