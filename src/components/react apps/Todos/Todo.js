const Todo = ({ todo: { title, desc, status, timeCreated, timeFinished}, index, theme: { style }, exitBtn, setDisplayTodoDisplayState }) => {

  const updateTodo = () => {
    setDisplayTodoDisplayState({status, index, title, desc, timeCreated});
  }

  return <div style={{position: 'relative'}}>
    <div className="Todo-container" style={style} onClick={updateTodo}>
      <h3>{title}</h3>
      <div>Created at: {timeCreated}</div>
      {status === "complete" && <div>Finished at: {timeFinished}</div>}
    </div>
    <button className={`Todo-exit-btn ${status === "pending" ? "Todo-green-hover" : ""}`} onClick={() => {exitBtn(index)}}>
      {status === "pending" ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
    </button>
  </div>
}

export default Todo
