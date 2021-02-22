import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import reactAppList from './reactAppList'

// css
import '../css/NoteList.css'

const AppList = () => {

  const [collections, setCollections] = useState({});

  const getCollections = async () => {
    const collections = await axios.get(`${process.env.REACT_APP_BACKEND}/apps`);
    setCollections(collections.data);
  }

  useEffect(() => {
    document.title = "Apps";
    getCollections();
    window.scrollTo({top: 0, behavior: 'smooth'}); 
  }, []);

  return (
    <div className="Notes-master-container">
      {collections && <div className="Notes-route-container">
        <div className="Notes-route REACT-blue-medium">
          <div className="Notes-title REACT-blue-dark REACT-padding-10">React Apps</div>
          <div className="Notes-notes REACT-global-scroll REACT-blue-scroll">
            {reactAppList.map(app => (
              <Link key={app} className="Notes-note" to={`apps/react/${app}`}>{app}</Link>
            ))}
          </div>
        </div>
        {Object.keys(collections).map(collection => (
          <div key={collection} className="Notes-route REACT-gray-medium">
            <div className="Notes-title REACT-gray-dark REACT-padding-10">{collection}</div>
            <div className="Notes-notes REACT-global-scroll">
              {collections[collection].map(note => (
                <Link 
                  key={`${collection.replace(/ /g,"-").toLowerCase()}/${note.replace(/ /g,"-").toLowerCase()}`} 
                  className="Notes-note" 
                  to={`apps/${collection.replace(/ /g,"-").toLowerCase()}/${note.replace(/ /g,"-").toLowerCase()}`}
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default AppList;
