import request from "../../utils/request.js";

export const getSearchSuggestion = (query, region) => {
    return request({
        url: 'map/map/suggestion',
        method: 'get',
        params: {query, region}
    })
}