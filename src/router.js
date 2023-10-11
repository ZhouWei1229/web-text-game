// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/Home.vue';
import Settings from './components/Settings.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
