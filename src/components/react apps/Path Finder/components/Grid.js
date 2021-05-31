import { useState, useEffect, Fragment } from 'react';
import Node from './Node';


const Grid = ({ rows, columns, startNode, endNode, drawMode }) => {

  const [nodes, setNodes] = useState([]);
  const [gridRatio, setGridRatio] = useState(1)
  const [mouseState, setMouseState] = useState(false);

  useEffect(() => {

    // grid ratio
    setGridRatio(columns/rows);

    // create grid
    let nodes = [];
    for (let i=0; i<rows; i++) {
      const row = [];
      for (let j=0; j<columns; j++) {
        let start = startNode[0] == j && startNode[1] == i ? true : false,
          end = endNode[0] == j && endNode[1] == i ? true : false;
        row.push({
          start,
          end,
          open: !start && !end ? true : false,
          value: columns*i + j
        });
      }
      nodes.push(row);
    }
    console.log(nodes);
    setNodes(nodes);
  }, []);

  const onMouseDown = e => {
    e.preventDefault();
    setMouseState(true);
  }

  const onMouseUp = e => {
    e.preventDefault();
    setMouseState(false);
  }

  return <>
    <div className="PATH__path-container">
      <div className="PATH__grid" onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        height: '25vw',
        minHeight: '250px',
        width: `calc(25vw * ${gridRatio})`,
        minWidth: `calc(250px * ${gridRatio})`
      }}>
        {nodes && nodes.map((row, rowIdx) => (<Fragment key={`${rowIdx}`}>
          {row.map((node, nodeIdx) => <Node key={`${columns*rowIdx + nodeIdx}`} node={node} mouseState={mouseState} drawMode={drawMode} />)}
        </Fragment>))}
      </div>
    </div>
  </>
}

export default Grid
