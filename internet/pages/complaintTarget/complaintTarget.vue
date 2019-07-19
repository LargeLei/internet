<template>
	<view class="grace-padding">
		<view class="target">
			<view class="target-list grace-space-between">
				<view class="target-list-title">企业名称</view>
				<view class="target-list-text">{{epName}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">统一社会信用代码</view>
				<view class="target-list-text">{{epCode}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">区域代码</view>
				<view class="target-list-text">{{areaCode}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">类型</view>
				<view class="target-list-text">{{epType}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">地址</view>
				<view class="target-list-text">{{epHouse}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">登记机关</view>
				<view class="target-list-text">{{epOffice}}</view>
			</view>
			<view class="target-list grace-space-between">
				<view class="target-list-title">经营范围</view>
				<view class="target-list-text">{{epRange}}</view>
			</view>
		</view>
		<view class="target-btn">
			<button @tap="goComplaintInfo">确定</button>
		</view>
	</view>
</template>
<script>
	var _self;
	var id;
	export default {
		onLoad: function(option) {
			_self = this;
			id = option.id;
			this.getComponyInfo();
		},
		data() {
			return {
				epName: '',
				epCode: '',
				areaCode: '',
				epType: '',
				epHouse: '',
				epOffice : '',
				epRange: ''	
			}
		},
		methods: {
			getComponyInfo:function(){
				_self.$qyc.interfaceRequest(
					"/entInfo/findEntInformationById", {
						id:id
					},
					function(res) {
						// console.log(JSON.stringify(res));
						_self.epName = res.data.entName;
						_self.epCode = res.data.uniscid;
						_self.areaCode = res.data.areaCode;
						_self.epType = res.data.enttypeCn;
						_self.epHouse = res.data.dom;
						_self.epOffice = res.data.regorgCn;
						_self.epRange = res.data.opscope;
					}
				);
			},
			goComplaintInfo: function() {
				uni.navigateTo({
					url: '/pages/addServiceInfo/addServiceInfo?id='+id
				});
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
