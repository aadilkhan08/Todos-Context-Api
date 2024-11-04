import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoContextProvider } from './contexts'
import { useEffect, useState } from 'react'

function App () {
  const [todos, setTodo] = useState([])

  const addTodo = todo =>
    setTodo(prev => [...prev, { id: Date.now(), ...todo, completed: false }])

  const updateTodo = (id, todo) => {
    console.log(id, todo)
    setTodo(prev =>
      prev.map(prevTodo => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = id => setTodo(prev => prev.filter(todo => todo.id !== id))

  const toggleTodo = id => {
    setTodo(prev =>
      prev.map(prevTodo =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodo(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className='h-screen w-screen bg-gradient-to-br from-purple-700 via-blue-500 to-teal-500 py-8 flex flex-wrap items-center justify-center'>
        <div className='w-screen max-w-2xl bg-white shadow-xl rounded-lg px-6 py-8 text-gray-800'>
          <h1 className='text-3xl font-bold text-center mb-8'>
            Manage Your Todos
          </h1>
          <div className='mb-6'>
            <TodoForm />
          </div>
          <div className='flex flex-col gap-y-4'>
            {todos.map(todo => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
