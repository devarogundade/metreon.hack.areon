import { createRouter, createWebHistory } from 'vue-router'
import PayView from '../views/PayView.vue'
import LinkDappView from '../views/LinkDappView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: PayView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/link-dapp',
      name: 'link',
      component: LinkDappView,
      meta: { transition: 'slide-right' }
    }
  ]
})

export default router
