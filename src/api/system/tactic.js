import request from '../../utils/request.js'

export const getList = (current, size, params) => {
    return request({
        url: 'system/tactic/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const add = (tactic) => {
    return request({
        url: 'system/tactic/submit',
        method: 'post',
        data: tactic,
    })
}
export const saveOrUpdateTactic = (tactic) => {
    return request({
        url: 'system/tactic/saveOrUpdateTactic',
        method: 'post',
        data: tactic,
    })
}

export const update = (row) => {
    return request({
        url: 'system/tactic/submit',
        method: 'post',
        data: row
    })
}

export const remove = (tacticId) => {
    return request({
        url: 'system/tactic/remove',
        method: 'post',
        params: {
            tacticId,
        }
    })
}
export const removeMany = (tacticList) => {
    return request({
        url: 'system/tactic/removeMany',
        method: 'post',
        data: tacticList
    })
}

export const getDetail = (ids) => {
    return request({
        url: 'system/tactic/detail/' + ids,
        method: 'get'
    })
}

export const switchTop = (tacticId) => {
    return request({
        url: 'system/tactic/switchTop',
        method: 'post',
        params: {
            tacticId,
        }
    })
}

