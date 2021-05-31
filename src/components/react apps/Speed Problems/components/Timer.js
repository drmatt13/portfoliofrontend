import React, { useState, useEffect } from 'react';

let timeout;

const Timer = ({ duration, setStatus }) => {

  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (count == 0) return setStatus(false);
    timeout = setTimeout(() => {
      setCount(count-1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [count]);

  return (
    <div style={{textAlign:"center", color:"#FFF7"}}>
      {count}
    </div>
  )
}

export default Timer
