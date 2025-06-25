import { useLoginStore } from '@/stores/Login'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue'), // 使用组件的方式加载登录页面,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomePage.vue'), // 使用组件的方式加载主页
      redirect: '/home/order?type=0', // 默认重定向到订单页面
      children: [
        {
          path: 'order',
          name: 'order',
          component: () => import('@/components/goods/OrderPage.vue'), // 使用组件的方式加载订单页面
        },
        {
          path: 'goods/0',
          name: 'Goods',
          component: () => import('@/components/goods/GoodsPage.vue'),
        },

        {
          path: 'goods/1',
          name: 'AddGoods',
          component: () => import('@/components/goods/AddGoods.vue'),
        },
        {
          path: 'goods/2',
          name: 'Recommedn',
          component: () => import('@/components/goods/RecommendPage.vue'),
        },
        {
          path: 'goods/category',
          name: 'GoodsCategory',
          component: () => import('@/components/goods/GoodsCategory.vue'),
        },
        {
          path: 'ownerlist',
          name: 'ManagerList',
          component: () => import('@/components/manager/ManagerList.vue'),
        },
        {
          path: 'ownerreq',
          name: 'ManagerReqList',
          component: () => import('@/components/manager/ManagerReqList.vue'),
        },
        {
          path: 'ownerorder',
          name: 'ManagerOrder',
          component: () => import('@/components/manager/ManagerOrder.vue'),
        },
        {
          path: 'data',
          name: 'Data',
          component: () => import('@/components/financial/DataCom.vue'),
        },
        {
          path: 'tradeinfo',
          name: 'Tradeinfo',
          component: () => import('@/components/financialManagement/tradeinfoPage.vue'),
        },
        {
          path: 'tradelist',
          name: 'Tradelist',
          component: () => import('@/components/financialManagement/tradelistPage.vue'),
        },
      ],
    },
  ],
})

// 路由守卫：每次路由跳转前都会执行
router.beforeEach((from) => {
  const Store = useLoginStore() // 获取登录状态的 Pinia store
  let isLogin = Store.isLogin() // 检查当前是否已登录

  // 如果已登录，或者目标路由是登录页，则允许通过
  if (isLogin || from.name === 'login') {
    return true // 允许通过
  }
  // 否则，重定向到登录页
  return { name: 'login' } // 重定向到登录页
  // 注意：如果你使用了动态导入（import()）来加载组件，确保在路由守卫中正确处理异步组件
  // 否则可能会导致路由守卫无法正确工作
  // 例如：使用 `component: () => import('@/views/login/LoginPage.vue')` 替代 `component: import('@/views/login/LoginPage.vue')`
  // 这样可以确保组件在路由守卫执行时已经加载完成
})

export default router
