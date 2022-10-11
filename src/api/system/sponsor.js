import request from "../../utils/request";

export const getList = (current, size, params) => {
    return request({
        url: 'system/sponsor/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}