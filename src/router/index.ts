// router.ts
import { createRouter, createWebHistory } from 'vue-router';

import Magang from '../pages/MagangPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/magang' },
        { path: '/magang', name: 'MagangPage', component: Magang },
    ],
});

export default router;