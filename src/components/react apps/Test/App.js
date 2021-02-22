import { useRef, useEffect } from 'react';
import Maps from './Maps';

// css
import './Maps.css';


const App = () => {

  const mapRef = useRef();

  // lat -90, 90
  // lng -180, 180

  const center = {
    lat: 40.7484405,
    lng: -73.9878584
  }

  const zoom = 16;

  useEffect(() => {

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom
    });
  
    new window.google.maps.Marker({position: center, map});
    
  }, [])

  return (
    <div
      ref={mapRef}
      className="MAP-master-component-container" 
      style={{height: '100%', width: '100%', borderRadius: '5px'}}
    >
      
    </div>
  )
}

export default App;