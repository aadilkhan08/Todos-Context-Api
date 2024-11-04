import React, { useState } from 'react'
import { useTodoContext } from '../contexts'

function TodoItem ({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleTodo } = useTodoContext()

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleTodo(todo.id)
  }

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-x-3 shadow-sm hover:shadow-lg transform transition duration-200 ease-in-out ${
        todo.completed ? 'bg-green-100' : 'bg-red-100'
      }`}
    >
      <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type='text'
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? 'border-gray-300 px-2' : 'border-transparent'
        } ${todo.completed ? 'line-through text-gray-500' : ''}`}
        value={todoMsg}
        onChange={e => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200 transition duration-200'
        onClick={() => {
          if (todo.completed) return
          if (isTodoEditable) {
            editTodo()
          } else setIsTodoEditable(prev => !prev)
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      {/* Delete Todo Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200 transition duration-200'
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
