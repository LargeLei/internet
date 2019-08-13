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
Vue.prototype.Appid = "wx04bb4da39331cbbb";

//小程序密钥
Vue.prototype.AppSecret = "c1e26aff8afaa4ac907a7aa02ff7c2c0";

//token存储
Vue.prototype.token = "ff96ac167e83e27e1b38393f7651d16d43a32c22494f1121a4c059bdf7f32b7a";

//网关---(投诉举报,事项清单，我的投诉举报)
Vue.prototype.interfaceUrl = "http://121.52.221.201:80";

//本地后台地址
// Vue.prototype.siteUrl = "http://a256160g08.qicp.vip";
Vue.prototype.siteUrl = "http://a256160g08.qicp.vip";

//曝光台
Vue.prototype.selfUrl = "http://121.52.221.197";

//静态资源路径
Vue.prototype.staticUrl = "https://staticimgs.oss-cn-beijing.aliyuncs.com/";

Vue.use(qycore);

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
