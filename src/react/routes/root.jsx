import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Root () {
  return (
    <div>
      <div className="p-4">
        <Link className="p-2" to='/'>home</Link>
        <Link className="p-2" to='/counter'>counter</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Root
