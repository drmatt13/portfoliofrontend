import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// css
import '../css/NoteList.css'

const NoteList = () => {

  const [collections, setCollections] = useState({});

  const getCollections = async () => {
    const collections = await axios.get(`${process.env.REACT_APP_BACKEND}/notes`);
    setCollections(collections.data);
  }

  useEffect(() => {
    document.title = "Notes";
    getCollections();
    window.scrollTo({top: 0, behavior: 'smooth'}); 
  }, []);

  return (
    <div className="Notes-master-container">
      {collections && <div className="Notes-route-container">
        {Object.keys(collections).map(collection => (
          <div key={collection} className="Notes-route REACT-gray-medium">
            <div className="Notes-title REACT-gray-dark REACT-padding-10">{collection}</div>
            <div className="Notes-notes REACT-global-scroll">
              {collections[collection].map(note => (
                <Link 
                  key={`${collection.replace(/ /g,"-").toLowerCase()}/${note.replace(/ /g,"-").toLowerCase()}`} 
                  className="Notes-note REACT-global-scroll" 
                  to={`notes/${collection.replace(/ /g,"-").toLowerCase()}/${note.replace(/ /g,"-").toLowerCase()}`}
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

export default NoteList;
