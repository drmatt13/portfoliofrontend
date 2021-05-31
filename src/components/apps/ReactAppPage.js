import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import PageChange from '../ui/PageChange';
import ErrorBoundry from '../../utilities/ErrorBoundry';
import reactAppList from './reactAppList';

let App = null;

const ReactAppPage = () => {

  let {app} = useParams();
  app = app.charAt(0).toUpperCase() + app.slice(1);

  if (!reactAppList.includes(app)) return null;

  App = lazy(() => import(`../react apps/${app}/App`));

  return <>
    <PageChange title={app} />
    <div className="APP-master-container f f-j-center fade-in">
      <div className="APP-flex-container">
        <ErrorBoundry>
          <Suspense fallback={<></>}>
            <App />
          </Suspense>
        </ErrorBoundry>
      </div>
    </div>
  </>
}

export default ReactAppPage;
