
import React from 'react';

function Todo(props) {
    const { title, Todo, _id } = props; 
    return (
        <div className = 'todo'>
            <h1>{ title }</h1>
            <h4>{ Todo }</h4>
        </div>
    )
}

export default Todo;