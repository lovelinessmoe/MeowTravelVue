import request from "../../utils/request";

export const getPageBaiduPoi = (current, size, params) => {
    return request({
        url: 'map/baidu/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}
export const savePoiImgUrl = (imgUrl, uid) => {
    return request({
        url: 'map/baidu/savePoiImgUrl',
        method: 'get',
        params: {
            imgUrl, uid
        }
    })
}