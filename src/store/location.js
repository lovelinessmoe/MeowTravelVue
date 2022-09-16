import store from './index.js'


/**
 * 获取登陆用户
 * 如果是没登陆返回的是undefined
 */
export function getUserLocation() {
    let location = undefined;
    try {
        location = JSON.parse(localStorage.location);
    } catch (e) {
        console.log("位置未获取")
    }
    return location;
}

export function setUserLocation(location) {
    localStorage.location = JSON.stringify(location);
    store.commit('REFRESH_USER_LOCATION');
}

export function removeUserLocation() {
    localStorage.removeItem('location');
    store.commit('REFRESH_USER_LOCATION');
}
