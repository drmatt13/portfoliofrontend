import React from 'react';
import loading from '../images/mouse.gif';

const Spinner = () => {
  return (
    <div style={{
      height: "300px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img src={loading} alt="loading" style={{
        maxHeight: "50%",
        maxWidth: "50%"
      }}/>
    </div>
  )
}

export default Spinner
