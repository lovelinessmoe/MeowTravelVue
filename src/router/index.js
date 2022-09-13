import {createRouter, createWebHashHistory} from "vue-router";
import {ElNotification} from 'element-plus'
import store from '../store'

const routes = [
    {path: '/', redirect: '/travel'},
    {
        path: '/travel/', component: () => import('../page/MainPage.vue'),
        children: [
            {path: '', redirect: '/travel/home'},
            {path: 'home', component: () => import('../page/Home.vue'), meta: {title: '首页'}},
            {
                path: 'manTactic',
                component: () => import('../page/user/TacticMan/ManTactic.vue'),
                meta: {title: '管理攻略'}
            },
            {
                path: 'postTactic',
                component: () => import('../page/user/TacticMan/PostTactic.vue'),
                meta: {title: '发布攻略'}
            },
            {path: 'userInfo', component: () => import('../page/user/UserInfo.vue'), meta: {title: '用户信息'}},
            {
                path: 'article/:id',
                component: () => import('../page/user/Tactic.vue'),
                meta: {title: '文章', params: 'id'}
            }, {
                path: 'tactic/edit/:id',
                component: () => import('../page/user/TacticMan/EditTacticPage.vue'),
                meta: {title: '修改文章', params: 'id'}
            },
        ]
    },
    {path: '/login', component: () => import('../page/Login.vue'), meta: {title: '登陆'}},
    {
        path: '/system/', component: () => import('../page/MainPage.vue'),
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
            {path: '', redirect: '/system/home'},
            {path: 'home', component: () => import('../page/system/SystemHome.vue')},
            {path: 'userMan', component: () => import('../page/system/UserMan.vue'), meta: {title: '用户管理'}},
            {path: 'tacticMan', component: () => import('../page/system/TacticMan.vue'), meta: {title: '攻略管理'}},
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let title = 'MeowTravel'
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
