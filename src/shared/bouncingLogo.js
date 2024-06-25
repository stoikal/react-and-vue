
const bouncingLogo = {
  width: 80,
  height: 80,
  top: 80,
  left: 80,
  
  intervalId: null,
  
  subscribers: [],

  isTouchingTop () {
    return this.arena.top >= this.top
  },

  isTouchingRight () {
    return this.arena.right <= this.left + this.width
  },
  
  isTouchingBottom () {
    return this.arena.bottom <= this.top + this.width
  },

  isTouchingLeft () {
    return this.arena.left >= this.left
  },

  x: 1,
  y: 1,
  
  start () {
    const arenaEl = document.getElementById("root-container")
    this.arena = arenaEl.getBoundingClientRect()
  
    clearInterval(this.intervalId)

    this.intervalId = setInterval(() => {
      if (this.isTouchingTop()) this.y *= -1
      if (this.isTouchingRight()) this.x *= -1
      if (this.isTouchingBottom()) this.y *= -1
      if (this.isTouchingLeft()) this.x *= -1

      this.left += this.x
      this.top += this.y

      this.subscribers.forEach((subscriber) => {
        subscriber({
          arena: this.arena,
          top: this.top,
          left: this.left,
          width: this.width,
          height: this.height,
        })
      })
    }, 10)
  },

  stop () {
    clearInterval(this.intervalId)
  },

  subscribe (fn) {
    this.subscribers.push(fn)
  },

  unsubscribe (fn) {
    this.subscribers.filter(item => item !== fn)
  }
}

export default bouncingLogo
