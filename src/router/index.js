import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Wallet from '../views/Wallet.vue'
import Banking from '../views/Banking.vue'
import Transactions from '../views/Transactions.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/wallet', component: Wallet },
  { path: '/banking', component: Banking },
  { path: '/transactions', component: Transactions },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
