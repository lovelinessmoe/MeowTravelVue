import request from "../../utils/request";

export const getComment = (commentId) => {
    return request({
        url: 'system/comment/getComment/' + commentId,
        method: 'get'
    })
}

export const remove = (commentId) => {
    return request({
        url: 'system/comment/remove/' + commentId,
        method: 'get'
    })
}
export const removeMany = (commentList) => {
    return request({
        url: 'system/comment/removeMany',
        method: 'post',
        data: commentList
    })
}
