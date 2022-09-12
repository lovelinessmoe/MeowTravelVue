import request from "../../utils/request";

export const getUserLocationVisual = () => {
    return request({
        url: 'system/visual/userLocation',
        method: 'get'
    })
}