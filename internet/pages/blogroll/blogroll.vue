<template>
	<view class="grace-padding">
		<view class="grace-padding department">
			<view class="blogroll-header">部门链接</view>
			<view class="grace-wrap department-item">
				<view class="department-list" v-for="(item, index) in department" :key="index">
					<image src="../../static/imgs/lj_icon.png" mode="widthFix"></image><text>{{item.linkTitle}}</text>
				</view>
			</view>
		</view>
		<view class="grace-padding department">
			<view class="blogroll-header">地方链接</view>
			<view class="grace-wrap department-item">
				<view class="department-list" v-for="(item, index) in place" :key="index" style="width:25%;">
					<text>{{item.linkTitle}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				department : [],
				place: []
			}
		},
		onLoad: function(option) {
			_self = this;
			this.DepartmentalLinks();
			this.placeLinks();
		},	
		methods: {
			DepartmentalLinks:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findDepartmentalLinks", {linkType:0},
					function(res) {
						_self.department = res.data;
					}
				);
			},
			placeLinks:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findDepartmentalLinks", {linkType:1},
					function(res) {
						_self.place = res.data;
					}
				);
			},
		}
	}
</script>
<style>
	page {background: #F8F9FC;}
	.grace-padding {padding: 0;width: 100%;}
	.blogroll-header{padding:0 30upx;font-size:32upx;color: #000000;font-weight: bold;line-height: 90upx;}
	.department-item{background:#fff;padding:0 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.department-list{height:90upx;line-height: 90upx;width:33.33%;}
	.department-list image{width:18upx;height:16upx;margin-right:10upx;}
	.department-list text{font-size: 28upx;color: #093F7F;}
	
</style>
