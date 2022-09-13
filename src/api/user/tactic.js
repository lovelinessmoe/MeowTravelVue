import request from '../../utils/request.js'

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
export const getUserTacticList = (current, size) => {
    return request({
        url: 'user/tactic/getUserTacticList',
        method: 'get',
        params: {
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

export const addTactic = (tactic) => {
    return request({
        url: 'user/tactic/addTactic',
        method: 'post',
        data: tactic,
    })
}

export const editTactic = (tactic) => {
    return request({
        url: 'user/tactic/editTactic',
        method: 'post',
        data: tactic,
    })
}

