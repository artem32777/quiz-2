import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import s1 from '@/slides/1/index.vue'
import s2 from '@/slides/2/index.vue'
import s3 from '@/slides/3/index.vue'
import s4 from '@/slides/4/index.vue'
import s5 from '@/slides/5/index.vue'
import s5a from '@/slides/5-a/index.vue'
import s5b from '@/slides/5-b/index.vue'
import s6 from '@/slides/6/index.vue'
import s7 from '@/slides/7/index.vue'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '1', component: s1 },
    { path: '/2', name: '2', component: s2 },
    { path: '/3', name: '3', component: s3 },
    { path: '/4', name: '4', component: s4 },
    { path: '/5', name: '5', component: s5 },
    { path: '/5-a', name: '5-a', component: s5a },
    { path: '/5-b', name: '5-b', component: s5b },
    { path: '/6', name: '6', component: s6 },
    { path: '/7', name: '7', component: s7 },
  ],
})

export default router
