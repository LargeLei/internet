<template>
	<view class="grace-padding">
		<view class="home-header">
			<image src="../../static/imgs/bg.png"></image>
		</view>
		<view class="notice">
			<view class="notice-box">
				<view class="grace-list laws-header" style="border:none;">
					<image src="../../static/imgs/gg_icon.png" class="grace-list-imgs-l" mode="widthFix"></image>
					<text class="grace-list-text">公告</text>
				</view>
				<view class="notice-detail">
					<view :class="'notice-text '+test+''">
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。{{test}}
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。
						国务院办公厅开通“互联网+监管”投诉举报专栏，欢迎你将市场主体、市场客体、市场行为的问题反映到本专栏。
						</br>
						我们会收集整理大家的投诉举报，进行专门研究，并督促有关地方和部门履行监管职责、查明问题、发现风险，我们会收集整理大家的投诉举报，进行专门研究，并督促有关地方和部门履行监管职责、
					</view>
					<view class="notice-down" v-show="noticeDownShow" @tap="noticeDown">
						<image src="../../static/imgs/gd_icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="notice-up" v-show="noticeUpShow" @tap="noticeUp">
					<image src="../../static/imgs/up_icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="grace-padding home-menu">
			<view class="grace-rows">
				<view class="grace-items grace-rows-demo" style="width:100%;" @tap="goComplaints">
					<image src="../../static/imgs/tsjb_icon.png" mode='widthFix' alt=""></image><text>我要投诉举报</text>
				</view>
			</view>
		</view>

		<view class="grace-padding laws">
			<view class="grace-list laws-header">
				<image src="../../static/imgs/tsjbxd_icon.png" class="grace-list-imgs-l" mode="widthFix"></image>
				<text class="grace-list-text">投诉举报选登</text>
			</view>
			<view class="light">
				<view class="light-list" v-for="(item1, index1) in light" :key="index1" >
					<view class="light-list-only" v-for="(item, index) in item1.resourcetitle" :key="index" @tap="goDigest(item.titleid)">
						<view class="grace-space-between"><text class="light-head">{{item.createtime}}</text><text class="light-title">{{item.sectitle}}</text></view>
						<view class="grace-ellipsis-2 light-text">{{item.titletext}}</view>
						<text class="light-state">{{item.leadtitle}}</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			this.loadComplaintList();
		},
		data() {
			return {
				noticeDownShow: true,
				noticeUpShow: false,
				test: '',
				light: []
			}
		},
		methods: {
			//加载投诉信息列表
			loadComplaintList: function() {
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infolist.do", {
						resourceid:48,
						siteid:1
					},
					function(res) {
							console.log(res)
							_self.light = res.resource;
					}
				);
			},
			goComplaints: function() {
				uni.navigateTo({
					url: '/pages/needKnows/needKnows'
				});
			},
			
			goDigest:function(titleId){
				uni.navigateTo({
					url: '/pages/digest/digest?titleId='+titleId
				});
			},
			noticeDown:function(){
				this.noticeDownShow = false;
				this.noticeUpShow = true;
				this.test = "notice-height";
			},
			noticeUp: function() {
				this.noticeDownShow = true;
				this.noticeUpShow = false;
				this.test = "";
			}
		}
	}
</script>
<style>
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
		height: 290upx;
		position: relative;
	}

	.home-header>image {
		width: 100%;
		height: 100%;
	}

	.notice {
		position: relative;
		margin-top: -150upx;
		z-index: 10;
		padding: 0 30upx;
	}

	.notice-box {
		background: #fff;
		box-shadow: 0 4upx 8upx 0 rgba(9, 63, 127, 0.05);
		border-radius: 12upx;
	}

	.notice-detail {
		padding: 0 20upx 20upx 20upx;
		position: relative;
	}

	.notice-down {
		position: absolute;
		height: 128upx;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: -webkit-linear-gradient(-90deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.88) 53%, #FFFFFF 100%);
		box-shadow: 0 4upx 8upx 0 rgba(9, 63, 127, 0.05);
		border-radius: 0px 0px 12upx 12upx;
	}

	.notice-down image {
		width: 64upx;
		height: 64upx;
		margin-top: 40upx;
	}

	.notice-text {
		max-height: 400upx;
		opacity: 0.7;
		font-size: 28upx;
		color: #000000;
		text-align: justify;
		line-height: 60upx;
		overflow: hidden;
	}

	.notice-text.notice-height {
		max-height: inherit;
	}

	.notice-up {
		height: 128upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
	}

	.notice-up image {
		width: 64upx;
		height: 64upx;
	}

	.home-menu {
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		background: #3691B7;
		padding: 14upx 0;
		z-index: 99;
	}

	.home-menu .grace-rows {
		position: relative;
	}

	.home-menu .grace-items {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.home-menu .grace-items image {
		width: 64upx;
		height: 64upx;
		margin-right: 6upx;
	}

	.home-menu .grace-items text {
		font-size: 36upx;
		color: #fff;
	}

	.light {
		box-shadow: 0 2upx 0 0 rgba(214, 214, 214, 0.50), 0 2upx 28upx 0 rgba(9, 63, 127, 0.05);
		padding: 0 30upx;
	}

	.light .light-list {
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
		padding: 20upx 0;
	}
	.light .light-list .light-list-only{
		margin-bottom: 20upx;
	}
	.light .light-list:last-child {
		border: none;
	}

	.light .light-list .light-head {
		opacity: 0.9;
		font-weight: bold;
		font-size: 30px;
		color: #000000;
		text-align: justify;
		line-height: 52px;
	}

	.light .light-list .light-title {
		opacity: 0.5;
		font-size: 24upx;
		color: #000000;
		text-align: justify;
		line-height: 52upx;
	}

	.light .light-list .light-text {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		text-align: justify;
		line-height: 52upx;
		margin-bottom: 5upx;
	}

	.light .light-list .light-state {
		font-weight: bold;
		font-size: 30upx;
		color: #3691B7;
		text-align: justify;
	}

	.laws {
		background: #fff;
		margin: 20upx 0 20upx 0;
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
</style>
