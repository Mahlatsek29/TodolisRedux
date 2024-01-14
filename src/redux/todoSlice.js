import { createSlice } from '@reduxjs/toolkit';

// Check if there's data in localStorage, otherwise use an empty array
const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      saveToLocalStorage(state);
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
        saveToLocalStorage(state);
      }
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title;
      saveToLocalStorage(state);
    },
  },
});

// Helper function to save state to localStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem('todos', JSON.stringify(state));
};

export const { addTodo, toggleComplete, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
