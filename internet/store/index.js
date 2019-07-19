import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		sessionid: "",
		userInfo: {}
	},
	mutations: {
		login(state, loginData) {
			state.userName = loginData.user.userName || '匿名用户';
			state.hasLogin = true;
			state.userInfo = loginData.user;
			state.sessionid = loginData.sessionid;
		
		},
		logout(state) {
			state.userName = "";
			state.userInfo = {};
			state.hasLogin = false;
			state.sessionid = "";
		}
	}
})

export default store
