import request from '../utils/request.js'

export const getList = (current, size, params) => {
    return request({
        url: 'tactic/getList',
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
        url: 'tactic/detail/' + tacticId,
        method: 'get',
        params: tacticId
    })
}


