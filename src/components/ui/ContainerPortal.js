import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const containerDiv = document.getElementById('container');
const appDiv = document.getElementById('app');

const CreatePost = ({ children, showContainerPortal }) => {

  useEffect(() => {
    const pageYOffset = window.pageYOffset;
    appDiv.style.marginTop = `-${pageYOffset}px`;
    // document.body.style.position = 'fixed';
    // document.body.style.overflowY = 'scroll';
    return () => {
      appDiv.style.marginTop = `0`;
      document.body.style.position = 'static';
      document.body.style.overflowY = 'auto';
      window.scrollTo(0, pageYOffset);
    }
  }, [])

  const onClickHandler = () => {
    showContainerPortal(undefined);
  }

  return createPortal(
    <>
      <div
      style={{
        backgroundColor: '#0005',
        position: 'fixed',
        height: '100vh',
        width: '100%',
        zIndex: '25',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div 
          onClick={onClickHandler}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}>
        </div>
        <div style={{zIndex: '10'}}>
          {children}
        </div>
      </div>
    </>, containerDiv
  )
}

export default CreatePost
