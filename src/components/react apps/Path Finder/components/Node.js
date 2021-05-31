import React, { useState, useEffect } from 'react'

const Node = ({node, mouseState, drawMode}) => {

  const [className, setClassName] = useState('');

  useEffect(() => {
    if (node.start) setClassName("PATH__start");
    else if (node.end) setClassName("PATH__end");
  }, []);

  const onMouseMove = e => {
    e.preventDefault();
    if (!node.start && !node.end && mouseState) {
      if (drawMode == 0) setClassName("PATH__wall");
      if (drawMode == 1) setClassName("");
    };
  }

  const onClick = e => {
    e.preventDefault();
    if (!node.start && !node.end) {
      if (drawMode == 0) setClassName("PATH__wall");
      if (drawMode == 1) setClassName("");
    }
  }

  return (
    <div onMouseMove={onMouseMove} onClick={onClick} draggable={true} className={className}></div>
  )
}

export default Node