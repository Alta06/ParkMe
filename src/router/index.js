import { createRouter, createWebHistory } from 'vue-router'
import firstView from '../views/FirstView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'firstview',
      component: firstView
    }
  ]
})

export default router
