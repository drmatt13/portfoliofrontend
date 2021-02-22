import { useEffect, useRef } from 'react';
import '../css/Footer.css';

const Footer = () => {

  const container = useRef(null);

  useEffect(() => {
    for(let image of container.current.children) {
      image.addEventListener('click', () => {
        window.location.href = image.getAttribute("link");
      });
    }
  }, []);

  return (
    <div className="FOOTER-master-container" style={{
      backgroundImage: 'url("/images/background2.jpg")'
    }}>
      <div className="FOOTER-background" ref={container} >
        <div className="FOOTER-image-container" link="https://cloud.google.com/">
          <img src="/images/gcp.png" alt="google cloud"/>
        </div>
        <div className="FOOTER-image-container" link="https://www.docker.com">
          <img src="/images/docker.png" alt="docker"/>
        </div>
        <div className="FOOTER-image-container" link="https://nodejs.org">
          <img src="/images/nodejs.png" alt="node"/>
        </div>
        <div className="FOOTER-image-container" link="https://reactjs.org">
          <img src="/images/react.png" alt="react"/>
        </div>
        <div className="FOOTER-image-container" link="https://redux.js.org">
          <img src="/images/redux.svg" alt="redux"/>
        </div>
        <div className="FOOTER-image-container" link="https://graphql.org/">
          <img src="/images/graphql.png" alt="graphql"/>
        </div>
        <div className="FOOTER-image-container" link="https://www.mongodb.com">
          <img src="/images/mongodb.png" alt="mongodb"/>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
