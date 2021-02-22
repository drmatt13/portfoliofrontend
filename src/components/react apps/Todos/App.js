import { useState, useRef } from 'react';
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

  const [theme, setTheme] = useState({theme: 'light', style: {backgroundColor: '#FFF9'}});
  const [todos, setTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);

  const inputRef = useRef(null);

  const toggleTheme = () => {
    if (theme.theme === 'light') setTheme({theme: 'dark', style: style.dark});
    else setTheme({theme: 'light', style: style.light});
  }

  const addTodo = todo => {
    setTodos([...todos, {todo, status: "pending", timeCreated: Date.now()}])
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

  const onSubmit = e => {
    e.preventDefault();
    if (inputRef.current.value === "") alert('please enter a todo');
    else addTodo(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <div style={{height: '100%', width: '100%', borderRadius: '5px'}}>
      <div className="Todo-master-container">
        <div className="Todo-header">
          <form onSubmit={onSubmit}>
            <input type="text" ref={inputRef} />
            <input type="submit" value="add todo" />
          </form>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <div className="Todos-container">
          <div className="Todo-pending-container">
            {todos.map((todo, index) => (
              <Todo
                key={index} 
                todo={todo} 
                index={index} 
                theme={theme}
                completeTodo={completeTodo}
              />
            ))}
          </div>
          <div className="Todo-completed-container">
            {finishedTodos.map((todo, index) => (
              <Todo
                key={index} 
                todo={todo} 
                index={index} 
                theme={theme}
                removeTodo={removeTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;