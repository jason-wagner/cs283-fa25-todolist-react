import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, title: 'Do Lab 6 for CS 283', isComplete: false, isEditing: false },
    {id: 2, title: 'Do laundry', isComplete: false, isEditing: false },
    {id: 3, title: 'Go grocery shopping', isComplete: false, isEditing: false },
  ]);

  const [todoInput, setTodoInput] = useState('');
  const [idForTodo, setIdForTodo] = useState(todos.length + 1);

  function handleTodoInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if(todoInput.trim().length === 0)
      return;

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput.trim(),
        isComplete: false,
        isEditing: false,
      }
    ]);

    setTodoInput('');
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1)
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isComplete = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        if(event.target.value.trim().length === 0)
          return todo;

        todo.title = event.target.value.trim();
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEditing(id) {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <>
      <div className="min-h-[100vh] p-2.5 bg-slate-100">
        <div className="m-auto mt-[30px] p-8 bg-white rounded-md shadow-lg max-w-[512px]">
          <h2 className="text-2xl font-bold">To-Do App</h2>

          <form action="#" onSubmit={addTodo}>
            <input type="text"
                  className="full border-0 shadow p-3.5 text-lg mt-4"
                  placeholder="New Item"
                  value={todoInput}
                  onChange={handleTodoInput}
            />
          </form>
          <ul className="mt-8">
            {todos.map((todo) => (
              <li key={todo.id} className="flex mt-6 items-center justify-between">
                <div className="flex flex-1 items-center mr-6">
                  <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.isComplete} />
                  { !todo.isEditing ? (
                    <span
                      onDoubleClick={() => markAsEditing(todo.id)}
                      className={`ml-4 ${todo.isComplete ? 'line-through' : ''}`}>
                        {todo.title}
                    </span>
                  ) : (
                    <input
                      type="text"
                      className="ml-4 w-full border-0 shadow-md px-2 text-lg"
                      defaultValue={todo.title}
                      autoFocus
                      onBlur={(event) => updateTodo(event, todo.id)}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          updateTodo(event, todo.id)
                        } else if (event.key === 'Escape') {
                          cancelEditing(todo.id);
                        }
                      }}
                    />
                  )}
                </div>
                <button className="bg-white text-red-700" onClick={() => deleteTodo(todo.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </li>         
            ))}
          </ul>
          <div className="flex justify-between items-center text-slate-600 mt-5 pt-4 border-t border-t-slate-200">
              <button>Mark all as complete</button>
              <span>{ todos.filter(todo => !todo.isComplete).length } items remaining</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
