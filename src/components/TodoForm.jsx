import React, { useState } from 'react'
import { useTodoContext } from '../contexts'

function TodoForm () {
  const [todo, setTodo] = useState('')
  const { addTodo } = useTodoContext('')

  const add = e => {
    e.preventDefault()
    if (!todo) return
    addTodo({ todo, completed: false })
    setTodo('')
  }

  return (
    <form onSubmit={add} className='flex'>
      <input
        type='text'
        placeholder='Write Todo...'
        className='w-full border border-gray-300 rounded-l-lg px-3 py-2 outline-none duration-200 bg-gray-50 focus:bg-white focus:border-blue-400'
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <button
        type='submit'
        className='rounded-r-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition duration-200'
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
