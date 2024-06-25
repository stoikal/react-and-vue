import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/root'
import Counter from './routes/counter'
import Home from './routes/home'
import Logo from './routes/logo'
import Todo from './routes/todo'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/counter",
        element: <Counter />
      },
      {
        path: "/todo",
        element: <Todo />
      },
      {
        path: "/logo",
        element: <Logo />
      }
    ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
