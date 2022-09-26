import request from "../../utils/request.js";

export const submitPoiRate = (rate, poiUid) => {
    return request({
        url: 'map/rate/submitRate',
        method: 'post',
        params: {
            rate,
            uid: poiUid
        }
    })
}
export const getPoiRate = (poiUid) => {
    return request({
        url: 'map/rate/getRate',
        method: 'post',
        params: {
            uid: poiUid
        }
    })
}

