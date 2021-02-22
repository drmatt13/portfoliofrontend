import { Route, Switch } from 'react-router-dom';

//Pages
import Home from './Home';
import NotesHome from '../notes/NotesHome';
import AppsHome from '../apps/AppsHome';
import SocialHome from '../social/SocialHome';
import ShopHome from '../shop/ShopHome';

const Pages = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/notes" component={NotesHome} />
      <Route path="/apps" component={AppsHome} />
      <Route path="/social" component={SocialHome} />
      <Route exact path="/shop" component={ShopHome} />
    </Switch>
  )
}

export default Pages;