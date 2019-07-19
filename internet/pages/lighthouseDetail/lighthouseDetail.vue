<template>
	<view class="grace-padding">
		<view class="target">
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国监管部门(机构)总数：</view>
				<view class="target-list-text">{{epName}}人</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国监管人员总数：</view>
				<view class="target-list-text">{{epCode}}人</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国监管事项总数：</view>
				<view class="target-list-text">{{epClass}}人</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国监管行为总数：</view>
				<view class="target-list-text">{{epType}}人</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国处理投诉举报总数：</view>
				<view class="target-list-text">{{epHouse}}人</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">全国处理违法行为总数：</view>
				<view class="target-list-text">{{epOffice}}人</view>
			</view>
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
				epName: '46',
				epCode: '108725',
				epClass: '350675',
				epType: '134056',
				epHouse: '287501',
				epOffice : '635034',
			}
		},
		methods: {
			
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

	.target {
		margin-top: 20upx;
		background: #fff;
		padding: 0 30upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.target-list {
		border-bottom: 1px solid rgba(214, 214, 214, 0.50);
		padding: 20upx 0;
	}

	.target-list:last-child {
		border: none;
	}

	.target-list .target-list-title {
		opacity: 0.5;
		font-size: 28upx;
		width:100%;
		color: #000000;
		text-align: justify;
		line-height: 52upx;
	}

	.target-list .target-list-text {
		opacity: 0.8;
		font-size: 28upx;
		color: #000000;
		text-align: right;
		line-height: 52upx;
		width: 55%;
	}

	.target-btn {
		margin: 100upx 30upx;
	}

	.target-btn button {
		background: #3691B7;
		border-radius: 8upx;
		color: #fff;
		height: 88upx;
		line-height: 88upx;
		font-size: 36upx;
	}

	.target-btn button:active {
		background: #3691B7;
		color: #fff;
	}
</style>
