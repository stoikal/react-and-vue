import { createWebHistory, createRouter } from 'vue-router'

import Root from './routes/Root.vue'
import Home from  './routes/Home.vue'
import Counter from './routes/Counter.vue'
import Todo from './routes/Todo.vue'
import Logo from './routes/Logo.vue'

const routes = [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'counter',
        component: Counter
      },
      {
        path: 'todo',
        component: Todo
      },
      {
        path: 'logo',
        component: Logo,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router