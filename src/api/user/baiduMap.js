import request from "../../utils/request.js";

export const getSearchSuggestion = (query, region) => {
    return request({
        url: 'map/map/suggestion',
        method: 'get',
        params: {query, region}
    })
}

export const searchSights = (query, location, region) => {
    return request({
        url: 'map/map/search',
        method: 'get',
        params: {query, location, tag: '景点', region}
    })
}

export const searchHotel = (query, location) => {
    return request({
        url: 'map/map/search',
        method: 'get',
        params: {query, location, tag: '酒店'}
    })
}

export const getPoiDetailById = (uid) => {
    return request({
        url: 'map/map/getDetailById/' + uid,
        method: 'get'
    })
}
export const getBaiDuPoiSuggestApi = (key) => {
    return request({
        url: 'map/baidu/getBaiDuPoiSuggestApi',
        method: 'get',
        params: {
            key
        }
    })
}