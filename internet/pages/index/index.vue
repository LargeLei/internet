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
					<view class="internet-my-center" @tap="goMy">
						<text>个人中心</text><image :src="portraitImg" mode='widthFix' alt=""></image>
					</view>
				</view>
			</view>
			<!-- <view class="grace-padding home-menu">
				<view class="home-menu-boxs" @tap="goCplRpt">
					<image src="../../static/imgs/tsjb_icon.png" mode='widthFix' alt=""></image><text>投诉举报</text>
				</view>
			</view> -->
			<view class="grace-padding home-option">
				<view class="grace-rows">
					<view class="grace-items grace-rows-demo">
						<view class="option-boxs" @tap="gosuper">
							<view class="option-btn">
								<image src="../../static/imgs/jgxx_icon.png" mode='widthFix' alt=""></image><text>监管信息查询</text>
							</view>
						</view>
					</view>
					<view class="grace-items grace-rows-demo">
						<view class="option-boxs" @tap="goCplRpt">
							<view class="option-btn">
								<image src="../../static/imgs/tsjb_icon.png" mode='widthFix' alt=""></image><text>投诉举报</text>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-rows">
					<view class="grace-items grace-rows-demo">
						<view class="option-boxs" @tap="goLighthouse">
							<view class="option-btn">
								<image src="../../static/imgs/bgt_btn.png" mode='widthFix' alt=""></image><text>曝光台</text>
							</view>
						</view>
					</view>
					<view class="grace-items grace-rows-demo">
						<view class="option-boxs" @tap="goitemList">
							<view class="option-btn">
								<image src="../../static/imgs/sxqd_btn.png" mode='widthFix' alt=""></image><text>事项清单</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="laws">
				<view class="grace-list laws-header" @tap="goLighthouse">
					<image src="../../static/imgs/jgdt_icon@2x.png" class="grace-list-imgs-l" mode="widthFix"></image>
					<text class="grace-list-text">监管动态</text>
					<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-right"></text>
				</view>
				<view class="light">
					<view class="light-list" v-for="(item, index) in laws" :key="index" @tap="goDetail(item.id)">
						<view class="grace-ellipsis-2">{{item.newsTitle}}</view>
						<text>{{item.createDate}}</text>
					</view>
				</view>
			</view>
			<view style="height:100upx;line-height: 100upx;text-align: center;opacity: 0.3; font-size: 24upx;color: #000000;">国务院办公厅主办</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			_self.token = uni.getStorageSync('token');
			//登录
			if (uni.getStorageSync('nickName') == null || uni.getStorageSync('nickName') == "") {
				_self.loginShow = true;
				_self.indexShow = false;
			} else {
				_self.loginShow = false;
				_self.indexShow = true;
				// _self.login();
			};
			this.lightArticle();
			if(!_self.token){
				return;
			}else{
				_self.updateToken();
			}
			
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
				laws: [{
						createDate:'23232',
						newsTitle:'算的地方的烦烦烦士大夫发生发生发射点发生的发射点发射点发射点发生得上是'
					},{
						createDate:'23232',
						newsTitle:'算得上是'
					}
				],
				inventory:[]
			}
		},
		methods: {
			//更新token
			updateToken:function(){
				_self.$qyc.request(
					"/f/wx/wxUser/tokenLogin", {
						openid: uni.getStorageSync('openid')
					},
					function(res) {
						if(res.data.status != 2){
							_self.token = res.data.tokenNo;
						}else{
							uni.removeStorageSync('token');
						}
					}
				);
			},
			//登录
			login: function() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						//console.log(loginRes.code)
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
								uni.showLoading({
									title: '登录中...'
								});
								_self.$qyc.request(
									"/f/mp/mplogin/getOpenId", {
										code: _self.code
									},
									function(res) {
										uni.hideLoading();
										//console.log(res)
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
			//首页监管动态
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
						uni.hideLoading();
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
			gosuper: function() {
				uni.navigateTo({
					url: '/pages/supervisionInfoQuery/supervisionInfoQuery'
				});
			},
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
			goCplRpt: function() {
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
		height: 230upx;
		position: relative;
	}

	.home-header>image {
		width: 100%;
		height: 100%;
	}

	.internet-my {
		position: absolute;
		top: 67upx;
		right: 34upx;
		color: #fff;
	}
	
	.internet-my-center {
		display: flex;
		align-items: center;
	}

	.internet-my-center image {
		width: 96upx;
		height: 96upx;
		border-radius: 50%;
		margin-right: 10upx;
		border: 6upx solid rgba(255, 255, 255, 0.4);
	}

	.internet-my-center text {
		padding-right: 24upx;
		font-size: 28upx;
		color: #FFFFFF;
	}
	.home-option{
		margin:32upx;
	}
	.home-option .grace-rows{
		margin-bottom: 20upx;
	}
	.home-option .grace-rows:last-child{
		margin-bottom: none;
	}
	.home-option .grace-items:nth-child(odd){
		margin-right: 22upx;
	}
	.option-boxs{
		position: relative;
		width: 332upx;
		height:186upx;
		background: #FFFFFF;
		box-shadow: 0 2px 14px 0 rgba(9,63,127,0.10);
		border-radius: 8px;
		overflow: hidden;
	}
	.option-btn{
		position: absolute;
		top:30upx;
		left:0;
		width:100%;
		text-align: center;
	}
	.option-btn image{
		width: 64upx;
		height: 64upx;
		display:block;
		margin:0 auto;
	}
	.option-btn text{
		display: inline-block;
		font-size: 28upx;
		color: #1D617E;
		opacity: 0.8;
		padding-top: 12upx;
	}
	.light .light-list {
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
		padding: 24upx 0;
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
		padding: 0 44px;
	}
	
	.laws-header {
		width: auto;
		padding: 14upx 0;
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
