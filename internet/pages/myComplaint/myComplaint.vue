<template>
	<view class="grace-padding">
		<!-- 搜索条 -->
		<view class="complaintSearch" style="width:98%; padding:20upx 2%;padding-right:0;flex-wrap:nowrap;">
			<view class="grace-search">
				<view class="grace-search-in">
					<image src="../../static/imgs/Search_icon.png" mode="widthFix"></image>
					<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="请输入投诉举报编号/对象名称"></input>
					<image src="../../static/imgs/delect_icon.png" mode="widthFix" @tap="clearKey" v-if="searchClose"></image>
				</view>
				<view class="search-btn" @tap="searchNow">搜索</view>
			</view>
		</view>
		<view style="height: 120upx;"></view><!-- 占位 -->
		<!-- 无内容 -->
		<view class="no-content" v-show="false">
			<image src="../../static/imgs/qst_img.png" mode="widthFix"></image>
		</view>
		<!-- 查询内容 -->
		<!-- 数据表格开始 -->
		<view>
			<view class="grace-table">
				<scroll-view class="grace-table-right" scroll-x="true">
					<view class="grace-table-title" style="width:1250upx;">
						<view>类型</view>
						<view>投诉举报对象</view>
						<view>投诉举报编号</view>
						<view>日期</view>
						<view>状态</view>
						<view>操作</view>
					</view>
					<view class="rows" v-for="(item, index) in rightData" :key="index" @tap="goProssingDetail(item.objectType,item.id)">
						<view class="items">{{item.objectType == 0?"投诉":"举报"}}</view>
						<view class="items">{{item.publicObject}}</view>
						<view class="items">{{item.publicNumber}}</view>
						<view class="items">{{item.createDate}}</view>
						<view class="items">{{
							item.stateCode == 0?"待受理":
							item.stateCode == 1?"已受理":
							item.stateCode == 2?"结案":
							item.stateCode == 3?"处理中":
							item.stateCode == 9?"结案":"未知"
						}}</view>
						<view class="items">
							<view class="plaint-btn" @tap.stop="showBanner(item.id)" v-if="item.objectType == 0 && item.stateCode == 0">撤回</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 弹出层 -->
		<graceMaskView :show="show">
			<view class="pop-detail">
				<view class="pop-title">提示</view>
				<view class="pop-text">
					<text>是否确认该投诉撤回？</text>
				</view>
			</view>
			<view class="grace-space-between pop-bottom">
				<view class="pop-btn" @tap="closeBanner">取消</view>
				<view class="pop-btn pop-blue" @tap="recall">确定</view>
			</view>
		</graceMaskView>
		<graceLoading :loadingType="loadingType"></graceLoading>
	</view>
</template>
<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	import graceLoading from '../../graceUI/components/graceLoading.vue';
	var _self;
	var page;
	var rows = 15;
	export default {
		onLoad: function(option) {
			_self = this;
			page = 1;
			this.loadDataList();
		},
		data() {
			return {
				id: "",
				searchKey: "",
				searchClose: false,
				show: false,
				rightData: [],
				//上拉加载
				loadingType: 0,
				isEnd: false,
			}
		},
		onBackPress: function() {
			page = 1;
			this.loading = false;
			this.loadingType = 0;
			this.isEnd = false;
		},
		onReachBottom: function() {
			//避免多次触发
			if (this.loadingType == 1 || this.isEnd) {
				return;
			}
			this.loadDataList();
		},
		methods: {
			reload: function() {
				this.loadDataList();
			},
			loadDataList: function() {
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/complaintreportpublic/findcomplaintreportpubliclist", {
						page: page,
						rows: rows
					},
					function(res) {
						if (res.success) {
							console.log(res)
							//展示loading
							_self.loadingType = 1;
							//追加数据(延迟1秒 模拟网络请求)
							setTimeout(function() {
								_self.loading = false;
								_self.rightData = _self.rightData.concat(res.data.rows);
								_self.loadingType = 0;
								//如果满足代表加载了全部数据
								if (page >= res.data.total) {
									_self.isEnd = true;
									_self.loadingType = 2;
									return;
								}
								page++;
							}, 1000);
						}
					}
				);
			},
			//搜索
			searchChange: function(e) {
				var key = e.detail.value;
				this.searchKey = key;
				if (key.length >= 1) {
					this.searchClose = true;
				} else {
					this.searchClose = false;
				}
			},
			clearKey: function() {
				this.searchClose = false;
				this.searchKey = "";
			},
			searchNow: function() {
				uni.showLoading({
					title: '搜索中...'
				});
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/complaintreportpublic/findcomplaintreportpubliclist", {
						publicNumber: _self.searchKey
					},
					function(res) {
						if (res.success) {
							uni.hideLoading();
							_self.rightData = res.data.rows;
						}
					}
				);
			},
			recall: function() {
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/complaints/updatecomplaintinformationevaluation", {
						id: _self.id,
						status: 8
					},
					function(res) {
						if (res.success) {
							_self.show = false;
							uni.showToast({
								title: "已撤回",
								duration: 2000,
								icon: 'none'
							});
						}
					}
				);
			},
			//弹出层
			closeBanner: function() {
				this.show = false;
			},
			showBanner: function(id) {
				console.log(id)
				_self.id = id;
				this.show = true;
			},

			//跳转页面
			goProssingDetail: function(objectType, id) {
				if (objectType == 0) {
					uni.navigateTo({
						url: '/pages/complaitProcessing/complaitProcessing?id=' + id
					});
				} else {
					uni.navigateTo({
						url: '/pages/reportProcessing/reportProcessing?id=' + id
					});
				}

			}
		},
		components: {
			graceLoading,
			graceMaskView
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

	.grace-ellipsis-1 {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		word-break: break-all;
		white-space: normal !important;
		-webkit-line-clamp: 1;
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
		background: #F7F9FC;
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

	/* 表格 */
	.grace-table {
		border-top: 2upx solid rgba(214, 214, 214, 0.50);
		background: #fff;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50);
		position: relative;
	}

	.grace-table .guodu {
		position: absolute;
		top: 0;
		left: 240upx;
		height: 100%;
		width: 19upx;
	}

	.grace-table-title {
		background: #FFFFFF;
		height: 96upx;
		line-height: 96upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50);
	}

	.grace-table-title:first-child {
		background: #F8F8F8;
	}

	.grace-table-title:first-child view {
		font-size: 26upx;
		color: #000000;
		width: 100%;
	}

	.grace-table-right {
		width: 100%;
	}

	.grace-table-right .grace-table-title view {
		padding: 0 24upx;
	}

	.grace-table-right .rows {
		height: 96upx;
		line-height: 96upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50);
		width: 1250upx;
	}

	.grace-table-right .rows .items {
		font-size: 26px;
		color: #666666;
		padding: 0 24upx;
	}

	.grace-table-right .rows .items:first-child {
		border-right: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.grace-table-right .rows .items .plaint-btn {
		background: #fff;
		font-size: 24upx;
		color: #3691B7;
		border: 1px solid #3691B7;
		border-radius: 4upx;
		width: 96upx;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 26upx;
	}
</style>
