import './assets/css/style.less'
import './assets/font/iconfont.css'

import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import _ from 'lodash'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import router from './router'
import moment from 'moment'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import request from "./utils/request.js";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App)
app.use(store)
app.use(_)
app.config.globalProperties.$_ = _
window.axios = request
app.use(Avue, {size: 'small',});
app.use(router)
app.use(mavonEditor)
app.use(moment)
app.config.globalProperties.$moment = moment
app.use(ElementPlus)
// 统一注册el-icon图标
for (let iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
}
app.config.silent = true

app.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'F4qaBc4xq7XxzmgBh72Vf4duqRYQ75Wb',
    // v:'2.0',  // 默认使用3.0
    // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
});

app.mount('#app')


export function delayer(action, delay = 1200) {
    let timer = -1;
    return nv => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            action(nv);
        }, delay);
    };
}