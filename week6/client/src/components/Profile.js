import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';

export default function Profile(){

    const { user: {username}, addTodo, Todo } = useContext(UserContext);

    return (
        <div className = 'profile'>
            <h2 className = 'hello'>Welcome {username}!</h2>
            <h3 className = 'post'>Add a Todo</h3>
            <TodoForm addIssue = {addTodo}/>
            <h3 className = 'post'>Post a Todo</h3>
            <TodoList issues = {Todo} />
        </div>
    )
};

