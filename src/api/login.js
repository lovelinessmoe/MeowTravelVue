import request from '../utils/request'
import qs from 'qs'

export const login = (loginUser) => {
    loginUser.client_id = 'meow_travel';
    loginUser.client_secret = '123456';
    loginUser.grant_type = 'captcha';

    return request({
        url: '/auth/oauth/token',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(loginUser)
    })
}

export const logout = () => {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}

export const captcha = () => {
    return request({
        url: '/user/auth/captcha',
        method: 'post'
    })
}
export const register = (loginUser) => {
    return request({
        url: '/user/auth/register',
        method: 'post',
        data: loginUser,
        params: {
            code: loginUser.mailCode
        }
    })
}
export const getRegisterEmail = (loginUser) => {
    return request({
        url: '/user/auth/registerMail',
        method: 'post',
        data: loginUser,
        params: {
            captchaVerification: loginUser.captchaVerification,
            code: loginUser.code
        }
    })
}

