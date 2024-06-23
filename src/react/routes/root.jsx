import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Root () {
  return (
    <div>
      <div>
        <Link to='/'>home</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Root
