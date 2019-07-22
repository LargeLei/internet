// 千叶核心文件
var _self;

export default {
	
	install: function(Vue) {
		_self = Vue.prototype;
		
	},
	
	request(url, data, callback,errBack) {
		uni.request({
			url: _self.siteUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
			},
			success: (res) => {
				if (res.data.result === "false" || res.data.result != "true") {
					uni.showToast({
						title: res.data.message,
						duration: 2000,
						icon: 'none'
					});
					if (errBack){
						errBack(res.data);
					}
					return
				}
	
				callback(res.data);
			},
			fail:(err) => {
				if (errBack){
					errBack(res.data);
				}
			}
		});
	
	},
	
	interfaceRequest(url, data, callback,errBack) {
		const crypto = _self.$crypto;
		const SHA256 = _self.$SHA256;
		const paasid = 'tsjb';
		const token = 'UCefCo5ot4GtjOIyjJufwJeFw7Wlytlt';
		const timestamp = (Date.now() / 1000).toFixed();
		const nonce = '123456789abcdefg';
		const signature = crypto.SHA256(timestamp + token + nonce + timestamp).toString(crypto.enc.Hex).toUpperCase();
		uni.request({
			url: _self.interfaceUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' ,//自定义请求头信息
				//'Content-Type':'application/json',
				'x-tif-paasid':paasid,
				'x-tif-timestamp':timestamp,
				'x-tif-signature':signature,
				'x-tif-nonce':nonce
			},
			success: (res) => {
				if (res.data.result === "false") {
					uni.showToast({
						title: res.data.message,
						duration: 2000,
						icon: 'none'
					});
					return
				}
				callback(res.data);
			},
			fail:(err) => {
				if (errBack){
					errBack(res.data);
				}
			}
		});

	},
	closeWin(reload){
		if (reload){
			var pages = getCurrentPages();//当前页
			var beforePage = pages[pages.length - 2];//上个页面
			// #ifdef H5
			beforePage.reload()
			// #endif
			// #ifndef H5
			beforePage.$vm.reload()
			// #endif
		}
		uni.navigateBack({
			delta: 1
		});
		
	},
	


}
