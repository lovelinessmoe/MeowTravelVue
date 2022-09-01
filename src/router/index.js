import {createRouter, createWebHashHistory} from "vue-router";
import {ElNotification} from 'element-plus'
import store from '../store'

const routes = [
    {path: '/', redirect: '/travel'},
    {
        path: '/travel/', component: () => import('../Page/Home.vue'),
        children: [
            {path: '', redirect: '/travel/home'},
            {path: 'home', component: () => import('../Page/Home.vue')},
        ]
    },
    {path: '/travel/userInfo', component: () => import('../Page/UserInfo.vue'), meta: {title: '用户信息'}},
    {path: '/login', component: () => import('../Page/Login.vue'), meta: {title: '登陆'}},
    {
        path: '/system/', component: () => import('../Page/system/BackHomePage.vue'),
        beforeEnter: () => {
            // 如果store.state.user是undefined返回false，正常返回他的权限是否等于ROLE_ADMIN
            if (store.state.user ? false : this.$store.state.user.role === 'ROLE_ADMIN') {
                ElNotification({
                    message: '用户权限不足',
                    type: 'error'
                })
                return {path: '/'}
            }
        },
        children: [
            {path: '', redirect: '/system/home.vue'},
            {path: 'home', component: () => import('../Page/system/BackHomePage.vue')},
            {path: 'userMan', component: () => import('../Page/system/UserMan.vue'), meta: {title: '用户管理'}},
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let title = 'MeowBlog'
    if (to.meta.params) {
        title = `${to.params[to.meta.params] || ''} - ${title}`
    } else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.commit('SET_LOADING', true);
    }
    next();
})
router.afterEach(() => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.commit('SET_LOADING', false);
    }, 1500)
})

// 导航转成路由
export default router
