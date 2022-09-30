import request from "../../utils/request.js";

export const paySponsorApi = (sponsor) => {
    return request({
        url: '/pay/pay/paySponsor',
        method: 'post',
        data: sponsor
    })
}
export const getPayStateApi = (sponsorId) => {
    return request({
        url: '/pay/pay/getPayState',
        method: 'get',
        params: {sponsorId}
    })
}