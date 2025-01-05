import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/navbar';

function App() {
  const [Todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    const todostring = localStorage.getItem('Todos');
    if (todostring) {
      const Todos = JSON.parse(todostring);
      setTodos(Todos);
    }
  }, []);

  const saveToLs = (newTodos) => {
    localStorage.setItem('Todos', JSON.stringify(newTodos));
  };

  const handleEdit = (e, id) => {
    const t = Todos.find((i) => i.id === id);
    setTodo(t.Todo);
    const newTodos = Todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = Todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo('');
    saveToLs(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.id;
    const tdidx = Todos.findIndex((t) => t.id === id);
    const newTodos = [...Todos];
    newTodos[tdidx].isCompleted = !newTodos[tdidx].isCompleted;
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-xl p-5 bg-blue-200 min-h-[80vh] my-5">
        <div className="addtodo">
          <h2 className="font-bold text-xl my-4">Add Todo</h2>
        </div>
        <input onChange={handleChange} value={Todo} type="text" className="w-1/2" />
        <button
          onClick={handleAdd}
          className="bg-blue-700 text-white p-2 py-1 mx-6 hover:bg-blue-900 font-bold rounded-xl"
        >
          Add
        </button>
        <h2 className="font-bold text-xl my-3">Your Todos</h2>
        {Todos.length === 0 && <div>No Todos to display</div>}
        <div className="todos">
          {Todos.map((item) => {
            return (
              <div key={item.id} className="todo flex w-1/2 justify-between my-4">
                <div className="flex gap-6">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id={item.id}
                  />
                  <div className={item.isCompleted ? 'line-through' : ''}>{item.Todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-blue-700 text-white p-2 py-1 mx-2 hover:bg-blue-900 font-bold rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-blue-700 text-white p-2 py-1 mx-2 hover:bg-blue-900 font-bold rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
