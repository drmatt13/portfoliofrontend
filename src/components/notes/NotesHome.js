import { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// redux
import { logoTransparent } from '../../actions/globalActions'

// lazy
const NoteList = lazy(() => import('./NoteList'));
const NotePage = lazy(() => import('./NotePage'));

const NotesHome = () => {

  useEffect(() => {
    logoTransparent(false);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/notes" component={NoteList} />
      <Route exact path="/notes/:collection/:note" component={NotePage} />
    </Suspense>
  )
}

export default NotesHome;
