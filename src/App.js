import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';

const App = () => {
  return (
    <div className="App">
      <ToastContainer theme='coloured' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoPage />} /> {/* Add this line for the root path */}
          <Route path='/todo' element={<TodoPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const TodoPage = () => {
  return (
    <div className='container' style={{ backgroundColor: "#B0E0E6", padding: "4rem", marginTop: "5rem" }}>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default App;
