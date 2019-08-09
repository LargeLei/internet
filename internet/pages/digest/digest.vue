<template>
	<view class="grace-padding">
		<view class="grace-detail">
			<view class="detail-tip"><view>用户信息</view></view>
			<view class="detail-content">{{infors.author}}</view>
		</view>
		<view class="grace-detail">
			<view class="detail-tip"><view>发布时间</view></view>
			<view class="detail-content">{{infors.time}}</view>
		</view>
		<view class="grace-detail">
			<view class="detail-tip"><view>投诉举报对象</view></view>
			<view class="detail-content">{{infors.titletext}}</view>
		</view>
		<view class="grace-detail">
			<view class="detail-tip"><view>信息内容</view></view>
			<view class="detail-content">{{infors.titlesubtext}}</view>
		</view>
		<view class="grace-detail">
			<view class="detail-tip"><view>信息状态</view></view>
			<view class="detail-content">{{infors.leadtitle}}</view>
		</view>
	</view>
</template>
<script>
	var _self, titleId;
	export default {
		onLoad: function(option) {
			_self = this;
			titleId = "";
			if (option.titleId) {
				titleId = option.titleId;
			}
			this.getComplaintList();
		},
		data() {
			return {
				//进度
				infors:''
			}
		},

		methods: {
			getComplaintList: function() {
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infocontent.do", {
						titleid: titleId,
						siteid: 1
					},
					function(res) {
						console.log(res)
						_self.infors = res;
					}
				);
			},


		}
	}
</script>
<style>
	page {
		background: #F8F9FC;
		
	}

	.grace-padding {
		padding: 0;
		width: 100%;
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

	.grace-detail {
		display: -webkit-box;
		border-bottom: 1px solid #e5e5e5;
	}

	.grace-detail .detail-tip {
		position: relative;
		width: 30%;
		background: #f0f0f0;
		border-right: 1px solid #e5e5e5;
	}
	.grace-detail .detail-tip view{
		width: 100%;
		text-align: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.grace-detail .detail-content {
		width: 70%;
		background: #fff;
		padding: 20upx;
		box-sizing: border-box;
	}
</style>
