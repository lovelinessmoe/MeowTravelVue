import request from "../../utils/request.js";

export const getSearchSuggestion = (query, region) => {
    return request({
        url: 'map/map/suggestion',
        method: 'get',
        params: {query, region}
    })
}

export const searchSights = (query, location) => {
    return request({
        url: 'map/map/search',
        method: 'get',
        params: {query, location, tag: '景点'}
    })
}

export const searchHotel = (query, location) => {
    return request({
        url: 'map/map/search',
        method: 'get',
        params: {query, location, tag: '酒店'}
    })
}

