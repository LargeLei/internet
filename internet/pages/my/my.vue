<template>
	<view class="grace-padding">
		<view class="my-box">
			<image src="../../static/imgs/bgmy.png"></image>
			<view class="my-detail">
				<view>
					<view class="my-detail-head">
						<image :src="portraitImg" mode="widthFix"></image>
					</view>
					<view class="my-detail-name">{{portraitName}}</view>
				</view>
			</view>
		</view>
		<view class="grace-padding">
			<view class="my-item">
				<block v-for="(item, index) in lists" :key="index">
					<navigator class="grace-list" :url="'../'+item.path+'/'+item.path+'?certKey='+certKey">
						<image :src="item.img" mode="widthFix" style=""></image><text class="grace-list-text">{{item.title}}</text>
						<text class="text-right">{{item.desc}}</text>
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-right"></text>
					</navigator>
				</block>
			</view>
		</view>
		<view class="attestation-btn" v-if="isNotOpen" @tap="goApprove">去认证</view>
		<view class="attestation-btn" v-else @tap="openBanner">退出登录</view>
		<view style="height: 44upx;"></view>

		<!-- 弹出层 -->
		<graceMaskView :show="isshow">
			<view class="pop-detail">
				<view class="pop-title">提示</view>
				<view class="pop-text">
					<text>确定要退出登录？</text>
				</view>
			</view>
			<view class="grace-space-between pop-bottom">
				<view class="pop-btn" @tap="closeBanner">取消</view>
				<view class="pop-btn pop-blue" @tap="outApprove">确定</view>
			</view>
		</graceMaskView>
	</view>
</template>
<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			_self.token = uni.getStorageSync('token');
			console.log(_self.token,'getoken')
			if(_self.token){
				_self.lists[1].desc = "已认证";
				_self.isNotOpen = false;
			}else{
				_self.lists[1].desc = "未认证";
				_self.isNotOpen = true;
			}
			this.getUserinfo();
			this.getApproveStatus();
		},
		data() {
			return {
				portraitImg: '../../static/imgs/mrtx_icon.png',
				portraitName: "",
				isNotOpen: true,
				isshow: false,
				certKey: '',
				lists: [{
						img: '../../static/imgs/wdtsjb_icon.png',
						title: '我的投诉举报',
						path: "myComplaint",
						desc: ""
					},
					{
						img: '../../static/imgs/grxx_icon.png',
						title: '个人信息',
						path: "personalInfo",
						desc: "未认证"
					},
					{
						img: '../../static/imgs/xxzx_icon.png',
						title: '消息中心',
						path: "messageCenter",
						desc: ""
					},
					{
						img: '../../static/imgs/wdsc_icon.png',
						title: '我的收藏',
						path: "favorite",
						desc: ""
					}
				]
			}
		},
		methods: {
			getUserinfo: function() {
				var avatar = uni.getStorageSync('avatarUrl');
				if (avatar) {
					_self.portraitImg = avatar
				}
				var trueName = uni.getStorageSync('trueName');
				if (trueName) {
					_self.portraitName = trueName;
					return;
				}
				var nickName = uni.getStorageSync('nickName');
				if (nickName) {
					_self.portraitName = nickName;
				}
			},
			goApprove: function() {
				uni.redirectTo({
					url: '/pages/approve/approve'
				});
			},
			getApproveStatus: function(e) {
				_self.$qyc.request(
					"/f/wx/wxUser/getApproveStatus", {
						openid: uni.getStorageSync('openid')
					},
					function(res) {
						//console.log("-----" + JSON.stringify(res));
						if (res.data != null) {
							// _self.lists[1].desc = "已认证";
							// _self.isNotOpen = false;
							_self.portraitName = res.data.trueName;
							_self.certKey = res.data.certKey;
							uni.setStorageSync('trueName', _self.portraitName);
							uni.setStorageSync('wxUsers', res.data);
						} else {
							_self.isNotOpen = true;
						}
					}
				);
			},
			outApprove: function(e) {
				_self.$qyc.request(
					"/f/wx/wxUser/deleteApproveStatus", {
						openid: uni.getStorageSync('openid'),
						token:uni.getStorageSync('token')
					},
					function(res) {
						uni.removeStorageSync('token');
						uni.removeStorageSync('trueName');
						console.log(_self.token,'notoken');
						_self.isshow = false;
						uni.redirectTo({
							url: '/pages/my/my'
						});
					}
				);
			},
			openBanner: function() {
				_self.isshow = true;
			},
			closeBanner: function() {
				_self.isshow = false;
			}
		},
		components: {
			graceMaskView
		}
	}
</script>
<style>
	page {
		background: #F8F9FC;
	}

	.col-blue {
		color: #3691B7 !important;
	}

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.my-box {
		position: relative;
	}

	.my-box>image {
		width: 100%;
		height: 332upx;
	}

	.my-detail {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-detail .my-detail-name {
		color: #fff;
		font-size: 36upx;
		text-align: center;
	}

	.my-detail .my-detail-head {
		width: 160upx;
		height: 160upx;
		overflow: hidden;
		margin: 0 auto;
		margin-bottom: 15upx;
	}

	.my-detail .my-detail-head image {
		width: 148upx;
		height: 148upx;
		border-radius: 50%;
		border: 6upx solid rgba(255, 255, 255, 0.4);
	}

	.grace-list {
		background: #fff;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		margin-top: 15upx;
		height: 100upx;
		line-height: 100upx;
		padding: 0 3%;
		position: relative;
	}

	.text-right {
		position: absolute;
		top: 0;
		right: 65upx;
		line-height: 100upx;
		color: #000000;
		opacity: 0.3;
		font-size: 28upx;
	}

	.grace-list .grace-list-text {
		opacity: 0.8;
		font-size: 28upx;
		color: #000000;
	}

	.grace-list-imgs-arrow {
		color: #000000;
		opacity: 0.5;
	}

	.grace-list:last-child {
		border: none;
	}

	.grace-list>image {
		width: 66upx !important;
		margin-right: 20upx;
	}

	.attestation-btn {
		margin: 0 2%;
		margin-top: 100upx;
		background: #3691B7;
		border-radius: 4px;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 36px;
		color: #FFFFFF;
	}

	/* pop */
	.pop-detail {
		padding: 30upx;
	}

	.pop-detail .pop-title {
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20upx;
	}

	.pop-detail .pop-text {
		opacity: 0.5;
		font-size: 28upx;
		color: #000000;
		text-align: center;
		line-height: 48upx;
	}

	.pop-detail .pop-text text {
		display: block;
	}

	.pop-bottom {
		height: 100upx;
		border-top: 1upx solid rgba(214, 214, 214, 0.50);
		position: relative;
	}

	.pop-bottom::after {
		content: "";
		position: absolute;
		top: 0;
		left: 50%;
		width: 2upx;
		height: 100%;
		background: rgba(214, 214, 214, 0.50);
	}

	.pop-bottom .pop-btn {
		width: 50%;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
		color: #000000;
	}

	.pop-bottom .pop-btn.pop-blue {
		color: #3691B7;
	}
</style>
