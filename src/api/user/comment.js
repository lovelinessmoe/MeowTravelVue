import request from "../../utils/request.js";

export const getComment = (tacticId) => {
    return request({
        url: 'user/comment/getComment/' + tacticId,
        method: 'get'
    })
}

export const addComment = (comment) => {
    return request({
        url: 'user/comment/addComment',
        method: 'post',
        data: comment
    })
}
