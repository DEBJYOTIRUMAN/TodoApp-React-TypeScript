import './App.css';
import AddTodo from './components/AddTodo';
import Navbar from './components/Navbar';
import { RiTodoLine } from "react-icons/ri";
import TodoList from './components/TodoList';

function App() {
  return (
    <main>
      <h2><RiTodoLine className="icons" /> TodoApp in TypeScript <RiTodoLine className="icons" /></h2>
      <Navbar />
      <AddTodo />
      <TodoList />
    </main>
  )
}

export default App;
