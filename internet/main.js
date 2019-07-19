import Vue from 'vue'
import App from './App'

import store from './store'
import qycore from './common/core/qycore.js'
import crypto from './node_modules/crypto-js/crypto-js.js'
import SHA256 from './node_modules/js-sha256/build/sha256.min.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$qyc = qycore
Vue.prototype.$crypto = crypto
Vue.prototype.$SHA256 = SHA256

//小程序APPID
Vue.prototype.Appid = "wxf155af1529928ccd";

//小程序密钥
Vue.prototype.AppSecret = "f4f5e4a4f514aca587ea4e307c6f7698";

//投诉举报地址
Vue.prototype.interfaceUrl = "http://121.52.221.201:80";

//本地
// Vue.prototype.interfaceUrl = "http://172.16.16.177:9000";

//本地后台地址
// Vue.prototype.siteUrl = "http://xiaobei.j2eeall.com";
Vue.prototype.siteUrl = "http://a256160g08.qicp.vip";


//静态资源路径
Vue.prototype.staticUrl = "https://staticimgs.oss-cn-beijing.aliyuncs.com/";

Vue.use(qycore);

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()