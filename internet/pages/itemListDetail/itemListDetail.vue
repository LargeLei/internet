<template>
	<view class="grace-padding">
		<view class="inventory-header">
			{{res.subitem}}
		</view>
		<view class="inventory-detail">
			<view class="inventory-list">
				<view class="inventory-list-title">监管部门:</view>
				<view class="inventory-list-text">{{res.dept}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管事项:</view>
				<view class="inventory-list-text">{{res.mainitem}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管事项子项:</view>
				<view class="inventory-list-text">{{res.subitem}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管对象:</view>
				<view class="inventory-list-text">{{res.object}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管措施:</view>
				<view class="inventory-list-text">{{res.measure}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">设定依据:</view>
				<view class="inventory-list-text">{{res.baseon}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管流程:</view>
				<view class="inventory-list-text">{{res.flow}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管结果:</view>
				<view class="inventory-list-text">{{res.result}}</view>
			</view>
			<view class="inventory-list">
				<view class="inventory-list-title">监管层级:</view>
				<view class="inventory-list-text">{{res.level}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	var cateId;
	export default {
		onLoad: function(option) {
			_self = this;
			if (option.cateId) {
				cateId = option.cateId;
			}
			this.getDataDetail();
		},
		data() {
			return {
				res: {
					"baseon": "",
					"dept": "",
					"flow": "",
					"level": "",
					"mainitem": "",
					"measure": "",
					"object": "",
					"permit": "",
					"result": "",
					"subitem": "",
				}
			}
		},
		methods: {
			getDataDetail: function() {
				uni.showLoading({
					title: '加载中...'
				});
				// uni.request({
				// 	url: _self.siteUrl+'/static/detail/' + cateId + '.json',
				// 	success: (res) => {
				// 		uni.hideLoading();
				// 		_self.res = res.data;
				// 	}
				// });
				_self.$qyc.request(
					'/static/detail/' + cateId + '.json', {},
					function(res) {
						uni.hideLoading();
						_self.res = res.data;
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

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.inventory-header {
		padding: 20upx 30upx;
		font-size: 32upx;
	}

	.inventory-detail {
		background: #fff;
		padding: 20upx 30px;
	}

	.inventory-list {
		display: flex;
		padding: 10upx 0;
	}

	.inventory-list-title {
		width: 135upx;
		color: #000;
		opacity: 0.5;
	}

	.inventory-list-text {
		width: 100%;
		flex: 1;
		color: #000;
		opacity: 0.8;
		text-align: justify;
	}
</style>
