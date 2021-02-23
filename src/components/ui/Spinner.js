import React from 'react';
import loading from '../images/mouse.gif';

const Spinner = () => {
  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img src={loading} alt="loading" style={{
        maxHeight: "500px",
        maxWidth: "500px"
      }}/>
    </div>
  )
}

export default Spinner
