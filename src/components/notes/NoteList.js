import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageChange from '../ui/PageChange';

// css
import '../css/NoteList.css'

const NoteList = () => {

  const [collections, setCollections] = useState({});

  const getCollections = async () => {
    const collections = await axios.get(`${process.env.REACT_APP_BACKEND}/notes`);
    setCollections(collections.data);
  }

  useEffect(() => {
    getCollections();
  }, []);

  return <>
    <PageChange title="Notes" />
    <div className="w-100p fade-in">
      {collections && <div className="Notes-route-container g">
        {Object.keys(collections).map(collection => (
          <div key={collection} className="bg-brown-400 Notes-route f f-d-column b-r-5 box-shadow-1">
            <div className="bg-brown-500 t-white t-lg f f-j-center f-a-center b-r-5 p-10">{collection}</div>
            <div className="mini-scroll brown-scroll f f-d-column of-y-auto">
              {collections[collection].map(note => (
                <Link 
                  key={`${collection.replace(/ /g,"-").toLowerCase()}/${note.replace(/ /g,"-").toLowerCase()}`} 
                  className="Notes-note t-white t-lg t-style-none p-t-5 p-l-20" 
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
  </>
}

export default NoteList;
