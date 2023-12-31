import request from '../../utils/request'

export const getList = (current, size, params) => {
    return request({
        url: 'system/user/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const add = (user) => {
    return request({
        url: 'system/user/submit',
        method: 'post',
        data: user,
    })
}

export const update = (row) => {
    return request({
        url: 'system/user/submit',
        method: 'post',
        data: row
    })
}

export const remove = (ids) => {
    return request({
        url: 'system/user/remove',
        method: 'post',
        params: {
            userId: ids,
        }
    })
}
export const removeMany = (userList) => {
    return request({
        url: 'system/user/removeMany',
        method: 'post',
        data: userList
    })
}

