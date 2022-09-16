import {createStore} from 'vuex'
import {getUser} from './token.js'
import {getUserLocation} from "./location.js";

const state = {
    loading: false,
    user: undefined,
    location: undefined,
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    async REFRESH_USER(state) {
        state.user = await getUser();
    },
    async REFRESH_USER_LOCATION(state) {
        state.location = await getUserLocation();
    }
}
const actions = {}
const getters = {
    loading: state => state.loading,
}

const store = createStore({
    state,
    mutations,
    actions,
    modules: {},
    getters
})

export default store


