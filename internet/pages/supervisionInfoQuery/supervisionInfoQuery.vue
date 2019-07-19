<template>
	<view class="grace-padding">
		<!-- 搜索条 -->
		<view class="complaintSearch" style="width:98%; padding:20upx 2%;padding-right:0;flex-wrap:nowrap;">
			<view class="grace-search">
				<view class="grace-search-in">
					<image src="../../static/imgs/Search_icon.png" mode="widthFix"></image>
					<input type="search" v-model="componyName" @input="findemagineList" @confirm="searchNow" :value="searchKey"
					 placeholder="企业名称或统一社会信用代码"></input>
					<image src="../../static/imgs/delect_icon.png" mode="widthFix" @tap="clearKey" v-if="searchClose"></image>
				</view>
				<view class="search-btn" @tap="searchNow()">搜索</view>
			</view>
		</view>
		<view style="height: 120upx;"></view><!-- 占位 -->
		<!-- 无内容 -->
		<view class="no-content" v-show="noContent">
			<image src="../../static/imgs/qst_img.png" mode="widthFix"></image>
		</view>
		<!-- 弹出层 -->
		<graceMaskView :show="show">
			<view class="pop-detail">
				<view class="pop-title">提示</view>
				<view class="pop-text">
					<text>您所查找的企业信</text>
					<text>息不存在</text>
				</view>
			</view>
			<view class="grace-space-between pop-bottom">
				<view class="pop-btn"  @tap="closeBanner">确定</view>
			</view>
		</graceMaskView>
		<!-- 搜索历史 -->
		<view class="search-history" v-show="historyShow">
			<view class="grace-title grace-nowrap grace-space-between">
				<view class="grace-h5">搜索历史</view>
				<view class="grace-more-r" @tap="clearTemp">清空历史</view>
			</view>
			<view class="search-history-item">
				<view class="search-history-list" v-for="(item, index) in historyList" :key="index" @tap="toInput(item)">
					<image src="../../static/imgs/lj_zh_icon.png" mode="widthFix"></image><text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="search-item">
			<view class="search-list" v-for="(item, index) in searchList" :key="index" @tap="goSupervisionInfo(item.id)">
				<view><text>企业名称：</text><text>{{item.shopName}}</text></view>
				<view><text>统一社会信用代码：</text><text>{{item.shopId}}</text></view>
			</view>
		</view>
	</view>
</template>
<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
		},
		data() {
			return {
				searchKey: "",
				show: false,
				historyShow: true,
				searchClose: false,
				componyName: "",
				historyTemp: uni.getStorageSync('searchHistory'),
				historyList: uni.getStorageSync('searchHistory').split("|" ,uni.getStorageSync('searchHistory').split("|").length -1),
				searchList: []
			}
		},
		methods: {
			//联想相关企业列表
			findemagineList: function(e) {
				_self.searchChange(e);
				if (e.detail.value.length >= 1) {
					_self.$qyc.interfaceRequest(
					"/entInfo/findEntInformationsByKeyword", {
						keywords: _self.componyName,
						areaCode: "000000"
					},
						function(res) {
							if (res.data.rows.length > 0) {
								_self.historyShow = false;
								_self.searchList = res.data.rows;
							}

						}
					);
				}

			},
			goSupervisionInfo:function(id){
				uni.navigateTo({
					url: '/pages/supervisionInfo/supervisionInfo?id='+id
				});
			},
			//搜索
			searchChange: function(e) {
				var key = e.detail.value;
				this.searchKey = key;
				if (key.length >= 1) {
					this.searchClose = true;
				} else {
					this.clearKey();
				}
			},
			clearKey: function() {
				this.searchClose = false;
				this.historyShow = true;
				this.searchKey = "";
				this.searchList = [];
				this.historyList = uni.getStorageSync('searchHistory').split("|",uni.getStorageSync('searchHistory').split("|").length -1);
			},
			clearTemp: function() {
				this.historyList = [];
				this.historyTemp = "";
				uni.removeStorageSync('searchHistory');
			},
			toInput:function(value){
				_self.searchKey = value;
				this.searchNow();
			},
			searchNow: function() {
				if (_self.searchKey.length >= 1) {
					uni.showLoading({
						title: '搜索中...'
					});
					_self.$qyc.interfaceRequest(
						"/entInfo/findEntInformationsByKeyword", {
							keywords: _self.searchKey,
							areaCode: "000000"
						},
						function(res) {
							_self.historyTemp = _self.searchKey + '|' + _self.historyTemp.split('|').filter(e => e != _self.searchKey).join(
								'|');
							uni.hideLoading();
							if (res.data.rows.length > 0) {
								uni.setStorageSync('searchHistory', _self.historyTemp);
								_self.historyShow = false;
								_self.searchList = res.data.rows;
							} else {
								_self.show = true;
							}
						}
					);
				}
			},
			//弹出层
			closeBanner: function() {
				this.show = false;
			},
			showBanner: function() {
				this.show = true;
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

	/* complaintSearch */
	.complaintSearch {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		background: #F8F9FC;
	}

	.grace-search-in {
		background: #FFFFFF;
		box-shadow: 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		border-radius: 6px;
		height: 80upx;
		padding: 0;
		align-items: center;
		width: 100%;
		flex: 1;
	}

	.grace-search-in input {
		height: 80upx;
	}

	.grace-search-in image {
		width: 64upx;
		height: 64upx;
		margin-left: 24upx;
	}

	.search-btn {
		opacity: 0.8;
		font-weight: bold;
		font-size: 30upx;
		color: #3691B7;
		padding: 0 30upx;
		line-height: 80upx;
	}

	/* no-content */
	.no-content {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.no-content image {
		width: 442upx;
		height: 362upx;
		margin-top: 30%;
	}

	/* search-history */
	.search-history {
		background: #fff;
		padding: 0 30upx;
		padding-bottom: 100upx;
	}

	.search-history .grace-title {
		height: 96upx;
		padding: 0;
		line-height: 96upx;
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.search-history .grace-title .grace-h5 {
		opacity: 0.9;
		font-weight: bold;
		font-size: 30upx;
		color: #000000;
		line-height: 96upx;
	}

	.search-history .grace-title .grace-more-r {
		font-size: 26upx;
		color: #3691B7;
	}

	.search-history-list {
		height: 96upx;
		display: flex;
		align-items: center;
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.search-history-list image {
		width: 18upx;
		height: 16upx;
		margin-right: 6upx;
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
	}
	.pop-bottom .pop-btn {   
		width: 100%;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
		color: #3691B7;
	}

	/* search-item */
	.search-item {
		background: #FFFFFF;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		padding: 0 30upx;
	}

	.search-list {
		padding: 20upx 0;
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.search-list:last-child {
		border: none;
	}

	.search-list view {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		line-height: 52upx;
	}
</style>
