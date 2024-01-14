import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, editTodo } from '../redux/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledListItem = styled.li`
  background-color: #CBC3E3;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  margin-right: 10px;
`;

const StyledButton = styled.button`
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  padding: 8px 12px;
  margin-left: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleCompleteClick = () => {
    dispatch(toggleComplete({ id, completed: !completed }));
    window.alert(`Task ${completed ? 'uncompleted' : 'completed'} successfully!`);
  };

  const handleDeleteClick = () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      dispatch(deleteTodo({ id }));
      window.alert('Todo deleted successfully!');
    } else {
      window.alert('Deletion canceled.');
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    dispatch(editTodo({ id, title: editedTitle }));
    setEditMode(false);
    window.alert('Todo edited successfully!');
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedTitle(title);
  };

  return (
    <StyledListItem className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <StyledFlexContainer>
        {editMode ? (
          <div className='input-group'>
            <StyledInput
              type='text'
              className='form-control'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <div className='input-group-append'>
              <StyledButton onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faSave} />
              </StyledButton>
              <StyledButton onClick={handleCancelClick}>
                <FontAwesomeIcon icon={faTimes} />
              </StyledButton>
            </div>
          </div>
        ) : (
          <StyledFlexContainer>
            <StyledInput
              type='checkbox'
              checked={completed}
              onChange={handleCompleteClick}
            />
            <span>{title}</span>
          </StyledFlexContainer>
        )}

        <StyledFlexContainer>
          <StyledButton onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </StyledButton>
          <StyledButton onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </StyledButton>
        </StyledFlexContainer>
      </StyledFlexContainer>
    </StyledListItem>
  );
};

export default TodoItem;
