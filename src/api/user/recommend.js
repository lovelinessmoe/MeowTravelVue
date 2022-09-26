import request from "../../utils/request.js";

export const getUserLikeSights = () => {
    return request({
        url: 'map/recommend/getUserLikeSights/',
        method: 'get'
    })
}