import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Conv2dView from '@/views/Conv2dView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import ConvRGBView from '@/views/ConvRGBView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/conv2d',
      name: 'Conv2d Visualization',
      component: Conv2dView,
    },
    {
      path: '/convrgb',
      name: 'Conv2d RGB Visualization',
      component: ConvRGBView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Page not found',
      component: PageNotFound,
    },
  ],
})

export default router
