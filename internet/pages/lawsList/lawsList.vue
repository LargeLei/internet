<template>
	<view class="grace-padding">
		<view class="grace-padding laws">
			<view class="light">
				<view class="light-list" v-for="(item, index) in laws" :key="index" @tap="goLawsDetail">
					<view class="grace-ellipsis-2">{{item.title}}</view>
					<text>{{item.time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {	
		data() {
			return {
				
				laws : [
					{ title: "国务院印发《关于政策法规的监督管理文献》的中共中央印发关于政策",time:"2019年02月30日"},
					{ title: "国务院印发《关于政策法规的监督管理文献》的中共中央印发关于政策",time:"2019年02月30日"},
					{ title: "中共中央印发《关于政策法规的监督管理文献》",time:"2019年02月30日"},
					{ title: "中共中央印发《关于政策法规的监督管理文献》",time:"2019年02月30日"},
					{ title: "中共中央印发《关于政策法规的监督管理文献》",time:"2019年02月30日"},
					{ title: "中共中央印发《关于政策法规的监督管理文献》",time:"2019年02月30日"}
				]
			}
		},
		methods: {
			goLawsDetail:function(){
				uni.navigateTo({
					url: '/pages/lawsDetail/lawsDetail'
				});
			}
			
		}
	}
</script>

<style>
	page{background: #F8F9FC;}
	.grace-ellipsis-2 {display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.grace-padding{padding:0;width: 100%;}
	.light{box-shadow: 0 2upx 0 0 rgba(214,214,214,0.50), 0 2upx 28upx 0 rgba(9,63,127,0.05);padding:0 30upx;}
	.light .light-list{border-bottom:2upx solid rgba(214,214,214,0.50);padding:20upx 0;}
	.light .light-list:last-child{border: none;}
	.light .light-list view{opacity: 0.8;font-size:30upx;color: #000000;text-align: justify;line-height:52upx;}
	.light .light-list text{opacity: 0.5;font-size:24upx;color: #000000;text-align: justify;}
	.laws{background:#fff;}
	
</style>
