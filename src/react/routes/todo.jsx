import React, { useCallback, useEffect, useState, useMemo } from 'react'
import todoService from '../services/todo'

function Home () {
  const [todos, setTodos] = useState([])

  const loadData = useCallback(async () => {
    const data = await todoService.getAll()
    setTodos(data)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const doneTodos = useMemo(() => {
    return todos.filter(todo => todo.is_done)
  }, [todos])

  const notDoneTodos = useMemo(() => {
    return todos.filter(todo => !todo.is_done)
  }, [todos])

  const toggleTodo = async (todo) => {
    await todoService.setIsDone(todo.id, !todo.is_done)
    loadData()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const inputValue = formData.get('new-todo')

    if (inputValue) {
      await todoService.create({
        title: inputValue,
        parent: null,
        is_done: false
      })
      form.reset()
      loadData()
    }
  }

  return (
    <div className='px-6'>
      <div className='mb-2'>
        {notDoneTodos.map((todo) => (
          <div key={todo.id}>
            <span
              role="button"
              className="cursor-pointer"
              onClick={() => toggleTodo(todo)}
            >
              {todo.title}
            </span>
          </div>
        ))}

        {doneTodos.map((todo) => (
          <div key={todo.id} >
            <span
              role="button"
              className="cursor-pointer"
              onClick={() => toggleTodo(todo)}
            >
              <s>{ todo.title }</s>
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input name="new-todo" />
      </form>
    </div>
  )
}

export default Home