import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/root'
import Counter from './routes/counter'
import Home from './routes/home'
import Logo from './routes/logo'

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
