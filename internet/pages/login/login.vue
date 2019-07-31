<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/imgs/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			if (uni.getStorageSync('nickName') == null || uni.getStorageSync('nickName') == "") {
				_self.isCanUse = true;
			}else{
				this.login();
			}
		},
		data() {
			return {
				nickName: null,
				avatarUrl: null,
				isCanUse: null,
				code: null,
				openid: null
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo: function() {
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						_self.isCanUse = false;
						_self.login();
					},
					fail(res) {
						uni.reLaunch({ //信息更新成功后跳转到小程序首页
							url: '/pages/index/index'
						});
					}
				});
			},

			//登录
			login: function() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_self.code = loginRes.code;
						//非第一次授权获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								//获取用户信息后向调用信息更新方法
								_self.nickName = infoRes.userInfo.nickName; //昵称
								_self.avatarUrl = infoRes.userInfo.avatarUrl; //头像
								uni.setStorageSync('nickName', _self.nickName);
								uni.setStorageSync('avatarUrl', _self.avatarUrl);
								_self.$qyc.request(
									"/f/mp/mplogin/getOpenId", {
										appid: _self.Appid,
										appSecret: _self.AppSecret,
										code: _self.code
									},
									function(res) {
										uni.reLaunch({ //信息更新成功后跳转到小程序首页
											url: '/pages/index/index'
										});
										var obj = JSON.parse(res.data);
										//console.log(res,_self.openid)
										_self.openid = obj.openid;
										uni.setStorageSync('openid', _self.openid);
									}
								);
							}
						});
					},
				});
			}
		}
	}
</script>
<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
