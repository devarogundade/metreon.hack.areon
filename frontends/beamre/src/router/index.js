import { createRouter, createWebHistory } from 'vue-router'
import BridgeView from '../views/BridgeView.vue'
import FaucetView from '../views/FaucetView.vue'
import TransactionsView from '../views/TransactionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bridge',
      component: BridgeView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/faucet',
      name: 'faucet',
      component: FaucetView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
      meta: { transition: 'slide-right' }
    }
  ]
})

export default router
