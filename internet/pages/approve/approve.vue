<template>
	<view class="grace-padding">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="approve" v-show="faceState">
					<dl class='approve-dl'>
						<dt>
							<image src="../../static/imgs/face-check.png" mode=""></image>
						</dt>
						<dd>
							<p>当前业务需要人脸识别验证</p>
							<p>信息将于当前微信绑定（用于身份验证）</p>
						</dd>
					</dl>
					<view class="grace-items">
						<view class="grace-label">姓名</view>
						<input type="text" class="input" v-model="username" placeholder="请输入真实姓名" :value="username"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">身份证</view>
						<input type="text" class="input" v-model="idCard" placeholder="请输入身份证号码" :value="idCard"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">手机号</view>
						<input type="text" class="input" v-model="mobile" placeholder="请输入手机号" :value="mobile"></input>
					</view>
					<view class="grace-items">
						<radio-group @change="radioChange" class='approve-ul'>
							<li v-for="(item, index) in radioType" :key="item.value">
								<label class="radio">
									<radio style="transform:scale(.7)" color="#3691B7" :checked="index === current" :value="item.value" />{{item.name}}
								</label>
							</li>
						</radio-group>
					</view>
					<view class="grace-items">
						<checkbox-group @change="checkboxChange" class="approve-agree">
							<view>
								<input style="transform:scale(.7)" color='#3691B7' :checked='isAgree' type="checkbox" value="1" />
							</view>
							<p>我同意国办电子政务办公室使用我所提交的信息用于快捷登录</p>
						</checkbox-group>
					</view>
					<view style="padding:40upx 0;">
						<button formType="submit" :disabled="disable" type="" style="width:96%;" @tap="faceCheck">开始验证</button>
					</view>
				</view>
				<view class="approve" v-show="subState">
					<view class="grace-items">
						<view class="grace-label">姓名</view>
						<input type="text" disabled class="input" v-model="username1" placeholder="请输入真实姓名" :value="username1"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">身份证</view>
						<input type="text" disabled class="input" v-model="idCard1" placeholder="请输入身份证号码" :value="idCard1"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">手机号</view>
						<input type="text" disabled class="input" v-model="mobile1" placeholder="请输入手机号" :value="mobile1"></input>
					</view>
					<view style="padding:40upx 0;">
						<button formType="submit" :disabled="disable" type="" style="width:96%;" @tap="subInfor">提交信息</button>
					</view>
				</view>
			</form>
			<view style="height:100upx;line-height: 100upx;text-align: center;opacity: 0.3; font-size: 24upx;color: #000000;">国务院办公厅主办</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
		},
		data() {
			return {
				//认证状态
				faceState: true,
				//提交状态
				subState: false,
				//按钮禁用
				disable: false,
				//是否同意
				isAgree: true,
				//身份证信息
				username: "雷清云",
				username1: '',
				idCard: '610527199106215651',
				idCard1: '',
				//绑定/验证手机号码
				mobile: '17348697420',
				mobile1: '',
				checkAliveType: '1',
				//识别方式
				radioType: [{
					value: "1",
					name: "反光识别"
				}, {
					value: "0",
					name: "读数识别"
				}, ],
				current: 0,
				cretKey: ''
			}
		},
		methods: {
			//切换识别方式
			radioChange: function(evt) {
				for (let i = 0; i < _self.radioType.length; i++) {
					if (_self.radioType[i].value === evt.target.value) {
						_self.current = i;
						_self.checkAliveType = _self.radioType[i].value
						break;
					}
				}
			},
			//是否同意
			checkboxChange: function(evt) {
				if (evt.detail.value == '') {
					_self.isAgree = false
				} else {
					_self.isAgree = true
				}
			},
			wordHidden: function(str, beforeLen, endLen) {
				var len = str.length - beforeLen - endLen;
				var word = '';
				for (var i = 0; i < len; i++) {
					word += '*';
				}
				return str.substring(0, beforeLen) + word + str.substring(str.length - endLen);
			},
			faceCheck: function(e) {
				// wx.checkIsSupportFacialRecognition({
				// 	complete(res) {
				// 		console.log(res)
				// 	}
				// })
				if (_self.username == '') {
					uni.showToast({
						type: 'warning',
						title: "请输入真实姓名",
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				let regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!regCard.test(_self.idCard)) {
					uni.showToast({
						type: 'warning',
						title: "请输入合法身份证号",
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				if (!(/^1[3456789]\d{9}$/.test(_self.mobile))) {
					uni.showToast({
						type: 'warning',
						title: "请输入有效手机号",
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				if (_self.isAgree == false) {
					uni.showToast({
						type: 'warning',
						title: "请同意认证协议",
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				console.log(_self.username, _self.idCard, _self.mobile, _self.checkAliveType)
				
				//获取本次认证结果凭据verifyResult
				wx.startFacialRecognitionVerify({
					name: _self.username,
					idCardNumber: _self.idCard,
					checkAliveType: _self.checkAliveType,
					success(res) {
						console.log(res)
						let verifyResult = res.verifyResult;
						if (verifyResult) {
							_self.faceState = false;
							_self.subState = true;
							_self.username1 = _self.wordHidden(_self.username, 1, 0);
							_self.mobile1 = _self.wordHidden(_self.mobile, 3, 4);
							_self.idCard1 = _self.wordHidden(_self.idCard, 6, 4);
						}
					}
				})
			},

			subInfor: function() {
				uni.showLoading({
					title: '正在提交...'
				});
				_self.$qyc.request(
					"/f/wx/wxUser/addApprove", {
						username: _self.username,
						mobile: _self.mobile,
						openid: uni.getStorageSync('openid'),
						idCard: _self.idCard
					},
					function(res) {
						uni.hideLoading();
						console.log(res)
						if (res.data) {
							let token = res.data;
							uni.setStorageSync('token',token);
							uni.showToast({
								title: "认证成功",
								duration: 2000,
								icon: 'none'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000);
						}

					}
				);
			}
		}

	}
</script>

<style>
	page {
		background: #F8F9FC;
	}

	input[type="radio"] {
		display: none;
	}

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.approve {
		background: #fff;
		padding: 0 30upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		margin-top: 20upx;
	}

	.approve-dl {
		width: 100%;
		padding: 20upx 0 40upx 0;
		text-align: center;
	}

	.approve-dl dt image {
		width: 260upx;
		height: 180upx;
		padding: 20upx 0;
	}

	.approve-dl dd p:last-child {
		color: #858585;
		font-size: 18upx;
	}

	.approve {
		background: #fff;
		padding: 0 30upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.approve .grace-items {
		padding: 0;
	}

	.approve-ul {
		width: 100%;
		display: -webkit-box !important;
		padding: 20upx 0;
	}

	.approve-ul li {
		-webkit-box-flex: 1;
		text-align: center;
		font-size: 34upx;
	}

	.approve-ul li:first-child {
		border-right: 1px solid #e2e2e2;
	}

	.approve-agree {
		display: -webkit-box;
		display: -webkit-flex;
		padding: 20upx 0;
		-webkit-flex-wrap: nowrap !important
	}

	.approve-agree p {
		padding: 0 10upx;
		color: #858585;
	}

	.approve .grace-items .grace-label {
		opacity: 0.8;
		font-size: 28upx;
		color: #000000;
		width: 200upx;
	}

	.approve .grace-form-r {
		line-height: 100upx;
		padding: 0;
	}

	.grace-form picker {
		height: 100upx;
		line-height: 100upx;
	}

	.hint {
		font-size: 24upx;
		color: #F0474A;
		text-align: justify;
		line-height: 52upx;
	}

	.gain {
		font-size: 28px;
		color: #3691B7;
		line-height: 100upx;
		text-align: right;
		width: 60%;
	}

	button {
		background: #3691B7;
		color: #fff;
	}

	button:active {
		background: #3691B7;
		color: #fff;
	}
</style>
