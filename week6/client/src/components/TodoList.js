import React from 'react'
import Todo from './Todo.js'

export default function TodoList(props){
  const { Todo } = props;

  return (
    <div className="todolist">
    {Todo.map((Todo) => 
    <Todo {...Todo} key = {Todo._id} />)}

    </div>
  )
}