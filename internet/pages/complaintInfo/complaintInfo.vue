
<template>
	<view class="grace-padding">
		<view class="target">
			<view class="target-list grace-space-between" v-for="(item, index) in targetList" :key="index">
				<view class="target-list-title">{{item.title}}</view><view class="target-list-text">{{item.text}}</view>
			</view>
		</view>
		<view class="target-btn">
			<button @tap="goService">确定</button>
		</view>
	</view>
</template>
<script>	
	export default {
		data() {
			return {
				targetList:[
					{title:"姓名",text:'苏大强'},
					{title:"身份证号",text:'51343620000****7858'},
					{title:"联系地址",text:'北京市 朝阳区 常营街道 金瓯家园xx号楼3单元3423室'},
					
				]
			}
		},
		methods: {
			goService:function(){
				uni.navigateTo({
					url: '/pages/addServiceInfo/addServiceInfo'
				});
			}
		}
	}
</script>
<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.target{margin-top:20upx;background:#fff;padding:0 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.target-list{border-bottom:1px solid rgba(214,214,214,0.50);padding:20upx 0;}
	.target-list:last-child{border:none;}
	.target-list .target-list-title{opacity: 0.5;font-size:28upx;color: #000000;text-align: justify;line-height: 52upx;}
	.target-list .target-list-text{opacity: 0.8;font-size: 28upx;color: #000000;text-align: right;line-height: 52upx;width:55%;}
	.target-btn{margin:100upx 30upx;}
	.target-btn button{background: #3691B7;border-radius: 8upx;color:#fff;height:88upx;line-height: 88upx;font-size: 36upx;}
	.target-btn button:active{background: #3691B7;color:#fff;}
</style>
