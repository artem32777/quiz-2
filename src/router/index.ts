import { createRouter, createWebHistory } from 'vue-router'
import s0 from '@/slides/0/index.vue'
import s1 from '@/slides/1/index.vue'
import s2 from '@/slides/2/index.vue'
import s3 from '@/slides/3/index.vue'
import s4 from '@/slides/4/index.vue'
import s5 from '@/slides/5/index.vue'
import s5a from '@/slides/5-a/index.vue'
import s5b from '@/slides/5-b/index.vue'
import s5c from '@/slides/5-c/index.vue'
import s5d from '@/slides/5-d/index.vue'
import s6 from '@/slides/6/index.vue'
import s7 from '@/slides/7/index.vue'
import s9 from '@/slides/9/index.vue'
import sMiniGame from '@/slides/mini-game/index.vue'
import sPoint5 from '@/slides/point-5/index.vue'
import sFinal from '@/slides/final/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '0', component: s0 },
    { path: '/1', name: '1', component: s1 },
    { path: '/2', name: '2', component: s2 },
    { path: '/3', name: '3', component: s3 },
    { path: '/4', name: '4', component: s4 },
    { path: '/5', name: '5', component: s5 },
    { path: '/5-a', name: '5-a', component: s5a },
    { path: '/5-b', name: '5-b', component: s5b },
    { path: '/5-c', name: '5-c', component: s5c },
    { path: '/5-d', name: '5-d', component: s5d },
    { path: '/6', name: '6', component: s6 },
    { path: '/7', name: '7', component: s7 },
    { path: '/mini-game', name: 'mini-game', component: sMiniGame },
    { path: '/point-5', name: 'point-5', component: sPoint5 },
    { path: '/9', name: '9', component: s9 },
    { path: '/final', name: 'final', component: sFinal },
  ],
})

export default router
