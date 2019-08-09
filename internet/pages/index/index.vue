<template>
	<view class="grace-padding">
		<view class="login" v-show="loginShow">
			<view>
				<view>
					<view class='header'>
						<image src='../../static/imgs/wx_login.png'></image>
					</view>
					<view class='content'>
						<view>申请获取以下权限</view>
						<text>获得你的公开信息(昵称，头像、地区等)</text>
					</view>
					<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="login">
						授权登录
					</button>
				</view>
			</view>
		</view>
		<view class="index" v-show="indexShow">
			<view class="home-header">
				<image src="../../static/imgs/bg.png"></image>
				<view class="internet-my">
					<view class="internet-my-title">国家 “互联网+监管”系统</view>
					<view class="internet-my-center" @tap="goMy">
						<image :src="portraitImg" mode='widthFix' alt=""></image><text>个人中心</text>
					</view>
				</view>
			</view>
			<view class="grace-padding home-menu">
				<view class="home-menu-boxs" @tap="goComplaintReporting">
					<image src="../../static/imgs/tsjb_icon.png" mode='widthFix' alt=""></image><text>投诉举报</text>
				</view>
			</view>
			<view class="grace-padding home-option">
				<view class="grace-rows">
					<view class="grace-items grace-rows-demo" style="width:50%;">
						<view class="option-boxs" @tap="goLighthouse">
							<image src="../../static/imgs/sxqd_bg.png" class="option-bg"></image>
							<view class="option-btn">
								<image src="../../static/imgs/bgt_btn.png" mode='widthFix' alt=""></image><text>曝光台</text>
							</view>
						</view>
					</view>
					<view class="grace-items grace-rows-demo" style="width:50%;">
						<view class="option-boxs" @tap="goitemList">
							<image src="../../static/imgs/sxqd_bg.png" class="option-bg"></image>
							<view class="option-btn">
								<image src="../../static/imgs/sxqd_btn.png" mode='widthFix' alt=""></image><text>事项清单</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grace-padding laws">
				<view class="grace-list laws-header" @tap="goLighthouse">
					<image src="../../static/imgs/bgt_icon.png" class="grace-list-imgs-l" mode="widthFix"></image>
					<text class="grace-list-text">曝光台</text>
					<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-right"></text>
				</view>
				<view class="light">
					<view class="light-list" v-for="(item, index) in laws" :key="index" @tap="goDetail(item.id)">
						<view class="grace-ellipsis-2">{{item.newsTitle}}</view>
						<text>{{item.createDate}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="grace-padding laws">
				<view class="grace-list laws-header" @tap="goitemList">
					<image src="../../static/imgs/sxqd_icon.png" class="grace-list-imgs-l" mode="widthFix"></image>
					<text class="grace-list-text">事项清单</text>
					<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-right"></text>
				</view>
				<view class="light">
					<view class="light-list" v-for="(item, index) in inventory" :key="index" @tap="goDetail(item.id)">
						<view class="grace-ellipsis-2">{{item.newsTitle}}</view>
					</view>
				</view>
			</view> -->
			<view style="height:100upx;line-height: 100upx;text-align: center;opacity: 0.3; font-size: 24upx;color: #000000;">国务院办公厅主办</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			console.log()
			//登录
			if (uni.getStorageSync('nickName') == null || uni.getStorageSync('nickName') == "") {
				_self.loginShow = true;
				_self.indexShow = false;
			} else {
				_self.loginShow = false;
				_self.indexShow = true;
				this.login();
			};
			this.lightArticle();
		},
		data() {
			return {
				loginShow: true,
				indexShow: false,
				//登录 
				nickName: null,
				avatarUrl: null,
				isCanUse: null,
				code: null,
				openid: null,
				//首页
				portraitImg: '',
				light: [],
				laws: [],
				inventory:[]
			}
		},
		methods: {
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
								//console.log(infoRes)
								_self.nickName = infoRes.userInfo.nickName; //昵称
								_self.avatarUrl = infoRes.userInfo.avatarUrl; //头像
								_self.portraitImg = infoRes.userInfo.avatarUrl;
								uni.setStorageSync('nickName', _self.nickName);
								uni.setStorageSync('avatarUrl', _self.avatarUrl);
								_self.$qyc.request(
									"/f/mp/mplogin/getOpenId", {
										appid: _self.Appid,
										appSecret: _self.AppSecret,
										code: _self.code
									},
									function(res) {
										console.log(res)
										_self.loginShow = false;
										_self.indexShow = true;
										var obj = JSON.parse(res.data);
										_self.openid = obj.openid;
										uni.setStorageSync('openid', _self.openid);
									}
								);
							},
							fail: function() {
								_self.portraitImg = '../../static/imgs/mrtx_icon.png';
							}
						});
					},
				});
			},


			//首页
			lightArticle: function() {
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infolist.do", {
						resourceid : 33,
						siteid : 1
					},
					function(res) {
						console.log(res,1111)
					
						//_self.laws = res.data.list.slice(0, 5);
					}
				);
			},	
			goMy: function() {
				uni.navigateTo({
					url: '/pages/my/my'
				});
			},
			// gosuper: function() {
			// 	uni.navigateTo({
			// 		url: '/pages/supervisionInfoQuery/supervisionInfoQuery'
			// 	});
			// },
			// goregulatory: function(index) {
			// 	uni.navigateTo({
			// 		url: '/pages/regulatory/regulatory?index=' + index
			// 	});
			// },
			goLighthouse: function(dicType) {
				uni.navigateTo({
					url: '/pages/lighthouse/lighthouse'
				});
			},
			// gorepublic: function() {
			// 	uni.navigateTo({
			// 		url: '/pages/republic/republic'
			// 	});
			// },
			goitemList: function() {
				uni.navigateTo({
					url: '/pages/itemList/itemList'
				});
			},
			goComplaintReporting: function() {
				uni.navigateTo({
					url: '/pages/cplRpt/cplRpt'
				});
			},
			// golighthouseDetail: function() {
			// 	uni.navigateTo({
			// 		url: '/pages/lighthouseDetail/lighthouseDetail'
			// 	});
			// },
			goDetail: function(articleId) {
				uni.navigateTo({
					url: '/pages/lawsDetail/lawsDetail?articleId=' + articleId
				});
			}
			// goBlogroll: function() {
			// 	uni.navigateTo({
			// 		url: '/pages/blogroll/blogroll'
			// 	});
			// },
		}
	}
</script>
<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	page {
		background: #F8F9FC;
	}

	.grace-ellipsis-2 {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		word-break: break-all;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.home-header {
		width: 100%;
		height: 310upx;
		position: relative;
	}

	.home-header>image {
		width: 100%;
		height: 100%;
	}

	.internet-my {
		position: absolute;
		top: 40upx;
		left: 30upx;
		right: 30upx;
		color: #fff;
	}

	.internet-my-title {
		font-size: 36upx;
		color: #FFFFFF;
	}

	.internet-my-center {
		display: flex;
		align-items: center;
		margin-top:30px;
	}

	.internet-my-center image {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin-right: 10upx;
		border: 6upx solid rgba(255, 255, 255, 0.4);
	}

	.internet-my-center text {
		font-size: 28upx;
		color: #FFFFFF;
	}

	.home-menu {
		position: relative;
		margin-top:-66upx;
	}
	.home-menu-boxs{
		background: rgba(255,255,255,0.9);
		box-shadow: 0 4upx 68upx 0 rgba(9,63,127,0.25);
		border-radius: 24upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin:0 32upx;
		height:132upx;
		position: relative;
	}
	.home-menu-boxs:after{
		content: "";
		position: absolute;
		width:6upx;
		height:80upx;
		left:0;
		top:26upx;
		background: #44AAC8;
		border-top-right-radius:6upx;
		border-bottom-right-radius:6upx;
	}
	.home-menu-boxs:before{
		content: "";
		position: absolute;
		width:6upx;
		height:80upx;
		right:0;
		top:26upx;
		background: #44AAC8;
		border-top-left-radius:6upx;
		border-bottom-left-radius:6upx;
	}
	.home-menu-boxs image{
		width: 64upx;
		height: 64upx;
		margin-right: 6upx;
	}
	.home-menu-boxs text{
		font-size:32upx;
		color: #3691B7;
		font-weight:bold;
	}
	.home-option{
		margin-top:30upx;
	}
	.home-option .grace-items{
		padding:0 30upx;
	}
	.option-boxs{
		position: relative;
		height:186upx;
		border-radius: 12upx;
		overflow: hidden;
	}
	.option-boxs .option-bg{
		height:100%;
		width:100%;
	}
	.option-btn{
		position: absolute;
		top:0;
		left:0;
		height:100%;
		width:100%;
		text-align: center;
	}
	.option-btn image{
		width: 64upx;
		height: 64upx;
		display:block;
		margin:0 auto;
		margin-top:36upx;
	}
	.option-btn text{
		font-size: 30upx;
		color: #FFFFFF;
		opacity: 0.8;
	}
	.light {
		box-shadow: 0 2upx 0 0 rgba(214, 214, 214, 0.50), 0 2upx 28upx 0 rgba(9, 63, 127, 0.05);
		padding: 0 30upx;
	}

	.light .light-list {
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
		padding: 20upx 0;
	}

	.light .light-list:last-child {
		border: none;
	}

	.light .light-list view {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		text-align: justify;
		line-height: 52upx;
	}

	.light .light-list text {
		opacity: 0.5;
		font-size: 24upx;
		color: #000000;
		text-align: justify;
	}

	.laws,
	.department {
		background: #fff;
		margin-top: 30upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.laws-header {
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.laws-header image {
		width: 60upx;
		height: 60upx;
	}

	.laws-header .grace-list-text {
		opacity: 0.9;
		font-size: 36px;
		color: #000000;
		font-weight: bold;
	}

	.laws-header .grace-list-imgs-arrow {
		font-size: 46upx;
		color: #b4b4b4;
	}

	.link .link-title {
		opacity: 0.7;
		font-size: 30upx;
		color: #000000;
		margin-right: 30upx;
	}

	.link .link-title.active {
		opacity: 0.9;
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
	}
	
	/* login */
	.login {
		background: #fff;
	}

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
