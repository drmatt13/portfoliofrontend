import React, { useState, useEffect } from 'react';

// classes
import Queue from '../classes/Queue';
import Memory from '../classes/Memory';

const Bloom = ({ columns, rows, startNode, cornerCases }) => {

  const [grid] = useState(document.querySelector(".PATH__grid"));
  const [queue] = useState(new Queue());
  const [memory] = useState(new Memory());

  const decode = (x, y) => {
    const range = columns*rows;
    if (y<0||x<=-1||x>=columns) return undefined;
    const num = y*columns + x;
    const decodedValue = -1 < num < range ? num : -1;
    return decodedValue > -1 ? grid.children[decodedValue] : undefined;
  }

  const bloom = () => {
    const [x, y] = queue.dequeue();
    const node = decode(x, y);
    if (node) {
      if (node.classList.contains("PATH__end")) queue.clear();
      else if (node.classList.contains("PATH__wall") || node.classList.contains("PATH__wall")) {}
      else {
        node.classList.add("PATH__bloom")
        if (cornerCases) {
          if (memory.shouldProcess(x-1, y-1)) queue.enqueue([x-1, y-1]);
          if (memory.shouldProcess(x+1, y-1)) queue.enqueue([x+1, y-1]);
          if (memory.shouldProcess(x+1, y+1)) queue.enqueue([x+1, y+1]);
          if (memory.shouldProcess(x-1, y+1)) queue.enqueue([x-1, y+1]);
        }
        if (memory.shouldProcess(x, y-1)) queue.enqueue([x, y-1]);
        if (memory.shouldProcess(x+1, y)) queue.enqueue([x+1, y]);
        if (memory.shouldProcess(x, y+1)) queue.enqueue([x, y+1]);
        if (memory.shouldProcess(x-1, y)) queue.enqueue([x-1, y]);
      }
    }
    if (queue.size) requestAnimationFrame(bloom);
    // setTimeout(() => {
    //   if (queue.size) requestAnimationFrame(bloom);
    // }, 100);
  }

  useEffect(() => {
    memory.shouldProcess(startNode[0], startNode[1]);
    queue.enqueue([startNode[0], startNode[1]]);
    bloom();
  }, []);

  return <></>;
}

export default Bloom;
