import axios from 'axios'
import {ElNotification} from 'element-plus'
import {removeUser} from '../store/token.js'
import store from '../store'
import router from '../router'

const instance = axios.create({
    // baseURL: 'http://localhost:9201/',
    baseURL: 'https://2420n0969k.zicp.fun/',
    // baseURL: 'http://192.168.64.133:9201/',
    timeout: 10000
})

// request拦截器
instance.interceptors.request.use(config => {
    if (store.state.user) {
        config.headers.Authorization = store.state.user.auth.token;
        // 处理刷新token后重新请求的自定义变量
        config['refresh_token'] = false
    }
    return config
}, error => {
    Promise.reject(error)
})

// response拦截器
instance.interceptors.response.use(response => {
    const res = response.data
    if (!res.success) {
        ElNotification({
            message: res.message, title: '警告', type: 'warning'
        })

        //登陆过期
        if (res.code === 2002) {
            removeUser()
            router.push('/login')
        }
        return response.data
    } else {
        if (res.message !== null) {
            ElNotification({
                message: res.message, title: '提示', type: 'success'
            })
        }
        return response.data
    }
}, error => {
    ElNotification.error({
        title: '网络错误' + error, message: '服务器超时'
    })
    return Promise.reject('error')
})
//其他主键可以访问
export default instance
