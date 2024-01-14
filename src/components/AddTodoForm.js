import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: #6a5acd; 
  padding: 20px; 
`;

const StyledInput = styled.input`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  background-color: #fff; /* White background color for the input field */
`;

const StyledButton = styled.button`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddTodoForm = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    // Check if the input field is empty
    if (!value.trim()) {
      window.alert('Please enter a valid todo before submitting.');
      return;
    }

    dispatch(addTodo({
      title: value,
    }));
    setValue('');
    window.alert('Todo added successfully!');
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput
        type='text'
        placeholder='Add todo...'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <StyledButton type='submit'>
        <FontAwesomeIcon icon={faPlus} />
      </StyledButton>
    </StyledForm>
  );
};

export default AddTodoForm;
