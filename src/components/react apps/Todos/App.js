import { useState, useEffect, useRef } from 'react';
import Todo from './Todo';

// css
import './Todos.css';

const style = {
  light: {
    backgroundColor: '#FFF9'
  },
  dark: {
    backgroundColor: '#0007',
    color: 'white'
  }
};

const App = () => {

  const [initialAppLoad, setInitialAppLoad] = useState(true);
  const [initialTodosStorage] = useState(JSON.parse(localStorage.getItem('todosStorage')) || {todos: [], finishedTodos: []});
  const [theme, setTheme] = useState({theme: 'light', style: {backgroundColor: '#FFF9'}});
  const [todos, setTodos] = useState(initialTodosStorage.todos);
  const [finishedTodos, setFinishedTodos] = useState(initialTodosStorage.finishedTodos);

  const [createTodoDisplayState, setCreateTodoDisplayState] = useState(false);
  const [displayTodoDisplayState, setDisplayTodoDisplayState] = useState({});

  const titleRef = useRef(null);
  const decriptionRef = useRef(null);

  const titleEditRef = useRef(null);
  const decriptionEditRef = useRef(null);

  useEffect(() => {
    setInitialAppLoad(false);
  }, [])

  useEffect(() => {
    if (!initialAppLoad) localStorage.setItem('todosStorage', JSON.stringify({todos, finishedTodos}));
    console.log(todos);
  }, [todos, finishedTodos])

  const toggleTheme = () => {
    if (theme.theme === 'light') setTheme({theme: 'dark', style: style.dark});
    else setTheme({theme: 'light', style: style.light});
  }

  const addTodo = (title, desc) => {
    setTodos([...todos, {title, desc, status: "pending", timeCreated: Date.now()}]);
    setCreateTodoDisplayState(false);
  }

  const completeTodo = (index) => {
    const array = todos.filter((todo, i) => {
      if (i===index) setFinishedTodos([...finishedTodos, {...todo, status: "complete", timeFinished: Date.now()}]);
      return i!==index;
    });
    setTodos(array);
  }

  const removeTodo = (index) => {
    const array = finishedTodos.filter((todo, i) => i!==index);
    setFinishedTodos(array);
  }

  const updateTodo = () => {
    setTodos(todos.map((todo, i) => {
      return displayTodoDisplayState.index !== i ? todo : {
        index: i,
        title: titleEditRef.current.innerText,
        desc: decriptionEditRef.current.innerText,
        status: displayTodoDisplayState.status,
        timeCreated: displayTodoDisplayState.timeCreated
      }
    }))
  }

  const onSubmit = e => {
    e.preventDefault();
    addTodo(titleRef.current.value, decriptionRef.current.innerText);
  }

  return <>
    <div className="Todo-master-container">
      {(createTodoDisplayState || Object.keys(displayTodoDisplayState).length !== 0) && <>
        <div className="Todo-background-container" onClick={() => {setCreateTodoDisplayState(false); setDisplayTodoDisplayState({});}} />
        {createTodoDisplayState && <div className="Todo-create-todo-container">
          <button className="Todo-exit-btn" onClick={() => setCreateTodoDisplayState(false)}><i className="fas fa-times" /></button>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Todo Title" ref={titleRef} style={{marginLeft: 10, paddingLeft: 2.5}} required />
            <input type="submit" value="add todo" style={{marginLeft: 5}} />
            <div 
              className="Todo-text-container" 
              placeholder="Todo Description" 
              ref={decriptionRef} 
              contentEditable
            />
          </form>
        </div>}
        {Object.keys(displayTodoDisplayState).length !== 0 && <div className="Todo-create-todo-container">
          <button className="Todo-exit-btn" onClick={() => setDisplayTodoDisplayState({})}><i className="fas fa-times" /></button>
          {displayTodoDisplayState.status === "pending" ? <>
            <div className="Todo-display-title" ref={titleEditRef} contentEditable>{displayTodoDisplayState.title}</div>
            <div className="Todo-display-desc" ref={decriptionEditRef} contentEditable>{displayTodoDisplayState.desc}</div>
            <div className="Todo-footer">
              <button onClick={updateTodo} style={{marginRight: 5}}>Update ToDo</button>
            </div>
          </> : <>
            <div className="Todo-display-title">{displayTodoDisplayState.title}</div>
            <div className="Todo-display-desc">{displayTodoDisplayState.desc}</div>
          </>}
        </div>}
      </>}
      <div className="Todos-container no-select">
        <div>{todos.map((todo, index) => <Todo 
          key={index} 
          todo={todo} 
          index={index} 
          theme={theme} 
          exitBtn={completeTodo} 
          setDisplayTodoDisplayState={setDisplayTodoDisplayState} 
        /> )}</div>
        <div>{finishedTodos.map((todo, index) => <Todo 
          key={index} 
          todo={todo} 
          index={index} 
          theme={theme} 
          exitBtn={removeTodo} 
          setDisplayTodoDisplayState={setDisplayTodoDisplayState} 
        /> )}</div>
      </div>
      <div className="Todo-footer">
        <button onClick={toggleTheme} style={{marginRight: 5}}>Toggle Theme</button>
        <button onClick={() => setCreateTodoDisplayState(true)}>Add ToDo</button>
      </div>
    </div>
  </>
}

export default App;