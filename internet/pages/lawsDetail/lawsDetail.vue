
<template>
	<view class="grace-padding">
		<view class="plaints">
			<view class="plaints-head grace-ellipsis-2">{{plaintsHead}}</view>
			<view class="plaints-time">{{plaintsTime}}</view>
			<view class="plaints-detail">
				<rich-text :nodes="content">
				
				</rich-text>
				<!-- <rich-text class="plaints-text">{{content}}</view> -->
				<!-- <image src="../../static/imgs/banner-gui.png" mode='widthFix'></image> -->
			</view>
		</view>
		<view class="favorite-change" @tap="favoriteChange" >
			<image :src="favorite" mode='widthFix'></image>
		</view>
	</view>
</template>
<script>	
	var _self;
	var articleId;
	var openid = uni.getStorageSync('openid');
	var is_colect = 0;
	
	
	export default {
		onLoad: function(option) {
			_self = this;
			articleId="";
			if(option.articleId){
				articleId = option.articleId;
			}
			this.getArticle();
			this.getColect();
// 			uni.setNavigationBarTitle({
// 　				title:"曝光台详情"
// 			})
		},
		data() {
			return {
				plaintsHead:"",
				plaintsTime:"",
				content:"",
				favorite:'../../static/imgs/wsc_icon.png'
			}
		},
		
		methods: {
			getArticle:function(){
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infocontent.do", {
						titleid : articleId,
						siteid : 1
					},
					function(res) {
						_self.plaintsHead = res.titletext;
						_self.plaintsTime = res.time;
						_self.content = res.titlecontent;
					}
				);
			},
			getColect:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findColectList", {articleId:articleId,openid:openid},
					function(res) {
						console.log(is_colect)
						//is_colect = res.data.length;
						if(is_colect == 0){
							_self.favorite = "../../static/imgs/wsc_icon.png"
						}else{
							_self.favorite = "../../static/imgs/ysc_icon.png"
						}
					}
				);
			},
			
			favoriteChange:function(){
				
				if(is_colect == 0){
					wx.showLoading({
					  title: '正在收藏...',
					  mask: true
					});

					_self.$qyc.request(
						"/f/mp/mplogin/colectAction", {articleId:articleId,openid:openid,plaintsHead:_self.plaintsHead},
						function(res) {
							_self.getColect();
							is_colect = 1;
							uni.showToast({
								title: "已收藏",
								duration: 2000,
								icon: 'success'
							});
						}
					);
				}
				if(is_colect == 1){
					wx.showLoading({
					  title: '取消收藏...',
					  mask: true
					});
					_self.$qyc.request(
						"/f/mp/mplogin/cancelColect", {articleId:articleId,openid:openid},
						function(res) {
							_self.getColect();
							is_colect = 0;
							uni.showToast({
								title: "已取消收藏",
								duration: 2000,
								icon: 'none'
							});
						}
					);
				}
			}
		}
	}
</script>
<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.grace-ellipsis-2 {display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.plaints{background:#fff;padding:20upx 30upx;}
	.plaints-head{opacity: 0.9;font-weight:bold;font-size: 32upx;color: #000000;text-align: justify;line-height:60upx;}
	.plaints-time{opacity: 0.5;font-size: 24upx;color: #000000;line-height:34upx;padding:15upx 0;}
	.plaints-detail{font-size:28upx;color: #152734;line-height:60upx;}
	.plaints-detail image{width:100%;}
	.plaints-title{opacity: 0.8;font-weight:bold;font-size:30upx;color: #000000;letter-spacing: 0;text-align: justify;line-height:60upx;}
	.plaints-text{opacity: 0.7;font-size: 28upx;color: #000000;text-align: justify;line-height: 60upx;}
	.favorite-change{position: fixed;bottom:50upx;right:50upx;width:76upx;height:76upx;}
	.favorite-change image{width:76upx;height:76upx;}
	.plaints-detail{width:96%;padding:0 2%;}
	.plaints-detail rich-text{overflow: hidden;}
	.plaints-detail rich-text img{width:100%; max-width: inherit !important;}
</style>
