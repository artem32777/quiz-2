import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import s1 from '@/slides/1/index.vue'
import s2 from '@/slides/2/index.vue'
import s3 from '@/slides/3/index.vue'
import s4 from '@/slides/4/index.vue'
import s5 from '@/slides/5/index.vue'
import s5a from '@/slides/5-a/index.vue'
import s5b from '@/slides/5-b/index.vue'
import s6 from '@/slides/6/index.vue'
import slide7 from '@/slides/7/slide7.vue'
import slide7Game from '@/slides/7-game/slide7-game.vue'
import slide8 from '@/slides/8/slide8.vue'
import slide9 from '@/slides/9/slide9.vue'
import slide9Game from '@/slides/9-game/slide9-game.vue'
import slide10 from '@/slides/10/slide10.vue'
import slide11 from '@/slides/11/slide11.vue'
import slide12 from '@/slides/12/slide12.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '1', component: s1 },
    { path: '/2', name: '2', component: s2 },
    { path: '/3', name: '3', component: s3 },
    { path: '/4', name: '4', component: s4 },
    { path: '/5', name: '5', component: s5 },
    { path: '/5-a', name: '5-a', component: s5a },
    { path: '/5-b', name: '5-b', component: s5b },
    { path: '/6', name: '6', component: s6 },
    { path: '/7', name: '7', component: slide7 },
    { path: '/7-game', name: '7-game', component: slide7Game },
    { path: '/8', name: '8', component: slide8 },
    { path: '/9', name: '9', component: slide9 },
    { path: '/9-game', name: '9-game', component: slide9Game },
    { path: '/10', name: '10', component: slide10 },
    { path: '/11', name: '11', component: slide11 },
    { path: '/12', name: '12', component: slide12 },
  ],
})

export default router
