<template>
	<view class="grace-padding">
		<view class="message-list" v-for="(item, index) in messageList" :key="index">
			<view class="grace-space-between message-list-head"><text class="message-list-title">{{item.title}}</text><text class="message-list-serial">编号:{{item.serial}}</text></view>
			<text class="message-list-time">{{item.time}}</text>
			<view class="not-see" v-show="item.show"></view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				messageList:[
					{title:"您投诉举报的内容有更新",serial:"JB20190502001",time:"2019年02月30日",show:true},
					{title:"您投诉举报的内容有更新",time:"2019年02月30日",show:true},
					{title:"您投诉举报的内容有更新",time:"2019年02月30日",show:true},
					{title:"您投诉举报的内容有更新",time:"2019年02月30日",show:false},
					{title:"您投诉举报的内容有更新",time:"2019年02月30日",show:false}
				]
			}
		},
		methods: {
		
		}
	}
</script>

<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.grace-ellipsis-2 {display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.message-list{background:#fff;padding:20upx 30upx;margin-top:20upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);position: relative;}
	.message-list-head{line-height: 52upx;}
	.message-list-head .message-list-title{opacity: 0.8;font-size: 30upx;color: #000000;}
	.message-list-serial{opacity: 0.5;font-size:24upx;color: #000000;}
	.message-list-time{opacity: 0.5;font-size:24upx;color: #000000;line-height: 50upx;}
	.not-see{position: absolute;top:15upx;right:15upx;width:16upx;height:16upx;background: #F0474A;border-radius: 50%;}
</style>
