import request from "../utils/request";

export const getUserInfo = () => {
    return request({
        url: '/user/user/getUserInfo',
        method: 'get',
    })
}

export const getModifyInfMail = (captchaVal) => {
    return request({
        url: '/user/user/modifyInfMail',
        method: 'post',
        params: {
            captchaVerification: captchaVal.captchaVerification,
            code: captchaVal.verifyCode
        }
    })
}

export const updateUserInfoApi = (user, mailCode) => {
    return request({
        url: '/user/user/updateUserInfo',
        method: 'post',
        data: user,
        params: {
            mailCode
        }
    })
}
