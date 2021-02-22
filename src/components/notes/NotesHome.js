import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import NoteList from './NoteList';
import NotePage from './NotePage';
import { logoTransparent } from '../../actions/globalActions'

const NotesHome = () => {

  useEffect(() => {
    logoTransparent(false);
  }, []);

  return (
    <>
      <Route exact path="/notes" component={NoteList} />
      <Route exact path="/notes/:collection/:note" component={NotePage} />
    </>
  )
}

export default NotesHome;
