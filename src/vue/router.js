import { createWebHistory, createRouter } from 'vue-router'

import Root from './routes/Root.vue'
import Home from  './routes/Home.vue'

const routes = [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '',
        component: Home,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router