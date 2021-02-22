const Todo = ({ todo: { todo, status, timeCreated, timeFinished}, index, theme: { style }, completeTodo, removeTodo }) => {

  return (
    <div className="Todo-container" style={style}>
      {index}
      {status === "pending" && <>
        <div>{todo}</div>
        <div>Time Created: {timeCreated}</div>
        <div>Time Finished: {timeFinished}</div>
        <button onClick={() => {completeTodo(index)}}>X</button>
      </>}
      {status === "complete" && <>
      <div>{todo}</div>
        <div>Time Created: {timeCreated}</div>
        <div>Time Finished: {timeFinished}</div>
        <button onClick={() => {removeTodo(index)}}>X</button>
      </>}
    </div>
  )
}

export default Todo
