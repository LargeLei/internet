// 千叶核心文件
var _self, crypto, SHA256,
	nonce = '123456789abcdefg';
export default {
	install: function(Vue) {
		_self = Vue.prototype;
		crypto = _self.$crypto;
		SHA256 = _self.$SHA256;
	},
	//投诉举报post
	interfaceRequest(url, data, callback, errBack) {
		const paasid = 'tsjb';
		const token = 'UCefCo5ot4GtjOIyjJufwJeFw7Wlytlt';
		let timestamp = (Date.now() / 1000).toFixed();
		let signature = crypto.SHA256(timestamp + token + nonce + timestamp).toString(crypto.enc.Hex).toUpperCase();
		uni.request({
			url: _self.interfaceUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', //自定义请求头信息
				//'Content-Type':'application/json',
				'x-tif-paasid': paasid,
				'x-tif-timestamp': timestamp,
				'x-tif-signature': signature,
				'x-tif-nonce': nonce
			},
			success: (res) => {
				uni.hideLoading();
				//console.log(res)
				if (res.statusCode != 200) {
					uni.showToast({
						title: "请求失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (res.data.success == false) {
					uni.showToast({
						title: "请求失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				} else {
					callback(res.data);
				}

			},
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},
	//文件上传post
	fileRequest(url, filePath, name, callback, errBack) {
		const paasid = 'tsjb';
		const token = 'UCefCo5ot4GtjOIyjJufwJeFw7Wlytlt';
		let timestamp = (Date.now() / 1000).toFixed();
		let signature = crypto.SHA256(timestamp + token + nonce + timestamp).toString(crypto.enc.Hex).toUpperCase();
		uni.uploadFile({
			url: _self.interfaceUrl + url, //仅为示例，并非真实接口地址。
			filePath: filePath,
			name: name,
			method: "POST",
			header: {
				'Content-Type': 'multipart/form-data', //文件上传
				//'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' ,//自定义请求头信息
				'x-tif-paasid': paasid,
				'x-tif-timestamp': timestamp,
				'x-tif-signature': signature,
				'x-tif-nonce': nonce
			},
			success: (res) => {
				//console.log(res,RegExp("false").test(res.data.success))
				uni.hideLoading();
				if (res.statusCode != 200) {
					uni.showToast({
						title: "请求失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (RegExp("").test(res.data.success) == false) {
					uni.showToast({
						title: "上传失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				} else {
					callback(res.data);
				}

			},
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},
	//事项清单GET
	getMatterUrl(url, data, callback, errBack) {
		const paasid = 'jgsxz';
		const token = 'DNQt3AfnSPVMU1E097KZ15drsKCECbvt';
		let timestamp = (Date.now() / 1000).toFixed();
		let signature = crypto.SHA256(timestamp + token + nonce + timestamp).toString(crypto.enc.Hex).toUpperCase();
		uni.request({
			url: _self.interfaceUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "GET",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', //自定义请求头信息
				//'Content-Type':'application/json',
				'x-tif-paasid': paasid,
				'x-tif-timestamp': timestamp,
				'x-tif-signature': signature,
				'x-tif-nonce': nonce
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode != 200) {
					uni.showToast({
						title: "请求失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (res.data.success == false) {
					uni.showToast({
						title: "请求失败！",
						duration: 2000,
						icon: 'none'
					});
					return
				} else {
					callback(res.data);
				}
			},
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},

	//曝光台
	selfRequest(url, data, callback, errBack) {
		uni.request({
			url: _self.selfUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
			},
			success: (res) => {
				//console.log(res)
				uni.hideLoading();
				if (res.statusCode != 200) {
					uni.showToast({
						title: res.errMsg,
						duration: 2000,
						icon: 'none'
					});
					if (errBack) {
						errBack(res.data);
					}
					return
				}

				callback(res.data);
			},
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},
	//本地POST
	request(url, data, callback, errBack) {
		uni.request({
			url: _self.siteUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
			},
			success: (res) => {
				uni.hideLoading();
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
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},
	//本地GET
	getRequest(url, data, callback, errBack) {
		uni.request({
			url: _self.siteUrl + url, //仅为示例，并非真实接口地址。
			data: data,
			method: "GET",
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
			},
			success: (res) => {
				uni.hideLoading();
				//console.log(res)
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
			fail: (err) => {
				if (errBack) {
					errBack(res.data);
				}
			}
		});

	},

	closeWin(reload) {
		if (reload) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面
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
