import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config/settings'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const PasswordReset = () => import('@/views/pages/PasswordReset')
const StoreRegister = () => import('@/views/pages/StoreRegister')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Profile = () => import('@/views/profile/Profile')
const Settings = () => import('@/views/settings/Settings')
const Subscription  = () => import('@/views/subscription/Subscription')
const StoreForms  = () => import('@/views/storeForms/StoreForms')
const StoreMenus  = () => import('@/views/storeMenus/StoreMenus')
const StoreSections  = () => import('@/views/storeSections/StoreSections')
const InventoryList  = () => import('@/views/inventory/List/List')
const InventoryNew = () => import('@/views/inventory/New/New')
const Customers  = () => import('@/views/customers/Customers')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }, 
        {
          path: 'user/profile',
          name: 'Profile',
          component: Profile,
          meta: {
            label: 'My Profile'
          }
        },
        {
          path: 'store/settings',
          name: 'Settings',
          component: Settings,
          meta: {
            label: 'Business settings'
          }
        },
        {
          path: 'user/subscription',
          name: 'Subscription',
          component: Subscription,
          meta: {
            label: 'My Subscription'
          }
        }
      ]
    },
    {
      path: '/store',
      name: 'Web',
      component: DefaultContainer,
      children: [
        {
          path: 'forms',
          name: 'StoreForms',
          component: StoreForms,
          meta: {
            label: 'Website Forms'
          }
        },
        {
          path: 'menus',
          name: 'StoreForms',
          component: StoreMenus,
          meta: {
            label: 'Website Menus'
          }
        },
        {
          path: 'sections',
          name: 'StoreForms',
          component: StoreSections,
          meta: {
            label: 'Website Sections'
          }
        }
      ]
    },
    {
      path: '/inventory',
      name: 'ERP',
      component: DefaultContainer,
      children: [
        {
          path: 'list',
          name: 'InventoryList',
          component: InventoryList,
          meta: {
            label: 'Store Inventory'
          }
        },
        {
          path: 'new',
          name: 'InventoryNew',
          component: InventoryNew,
          meta: {
            label: 'New Inventory'
          }
        },
        {
          path: 'edit/:uuid',
          name: 'InventoryNew',
          component: InventoryNew,
          meta: {
            label: 'Edit product' 
          }
        }

      ]
    },
    {
      path: '/customers',
      name: 'ERP',
      component: DefaultContainer,
      children: [
        {
          path: 'list',
          name: 'InventoryList',
          component: Customers,
          meta: {
            label: 'Store Customers'
          }
        },
        {
          path: 'new',
          name: 'InventoryNew',
          component: InventoryNew,
          meta: {
            label: 'New Customer'
          }
        },
        {
          path: 'edit/:uuid',
          name: 'InventoryNew',
          component: InventoryNew,
          meta: {
            label: 'Edit Customer' 
          }
        }

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout'
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/password/reset',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/store/register',
      name: 'StoreRegister',
      component: StoreRegister
    }
  ]
})
