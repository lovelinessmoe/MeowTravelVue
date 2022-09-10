import request from '../utils/request.js'

export const getList = (current, size, params) => {
    return request({
        url: 'user/tactic/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const getBlogDetail = (tacticId) => {
    return request({
        url: 'user/tactic/detail/' + tacticId,
        method: 'get'
    })
}


