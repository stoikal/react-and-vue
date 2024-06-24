import React, { useState } from 'react'

function Counter () {
  const [count, setCount] = useState(0)

  return (
    <div className="px-6">
      <div>count: {count}</div>
      <button onClick={() => setCount((prev) => --prev)}>
        decrement
      </button>
      <button onClick={() => setCount((prev) => ++prev)}>
        increment
      </button>
    </div>
  )
}

export default Counter