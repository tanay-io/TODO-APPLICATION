import { useState } from 'react';
import './App.css';
import { CreateTodo } from './Components/CreateTodo';
import { Todo } from './Components/Todo';

function App() {
 
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <CreateTodo />
      <Todo todos={todos} />
    </div>
  );
}

export default App;
