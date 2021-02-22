import { useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundry from '../../utilities/ErrorBoundry';
import reactAppList from './reactAppList';

let App = null;

const ReactAppPage = () => {

  let {app} = useParams();

  app = app.charAt(0).toUpperCase() + app.slice(1);

  useEffect(() => {
    document.title = app;
    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector(".app-master-container").classList.add("REACT-bottom-border");

    return () => {
      document.querySelector(".app-master-container").classList.remove("REACT-bottom-border");
    }
  }, [])

  if (!reactAppList.includes(app)) return null;

  App = lazy(() => import(`../react apps/${app}/App`));

  return (
    <div className="APP-master-container">
      <div className="APP-flex-container">
        <ErrorBoundry>
          <Suspense fallback={<></>}>
            <App />
          </Suspense>
        </ErrorBoundry>
      </div>
    </div>
  )
}

export default ReactAppPage;
