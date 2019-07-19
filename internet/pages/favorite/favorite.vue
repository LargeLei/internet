<template>
	<view class="grace-padding">
		<view>
			<view class="grace-scroll-do">
				<scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in msg" :scroll-left="scrollIndex == index ? 180 : 0"
				 @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index" >
					<view class="grace-items" @tap.stop="goDetail(item.id)">
						<view class="contents">
							<view class="grace-h5 grace-ellipsis-2 favorite-title">{{item.newsTitle}}</view>
							<view class="favorite-time">{{item.createDate}}</view>
						</view>
					</view>
					<view class="grace-items btn" :data-id="index" @tap="removeMsg(item.id)" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">删除</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self, x, y;
	var openid = uni.getStorageSync('openid');
	export default {
		onLoad: function(option) {
			_self = this;
			this.getCollectList();
		},
		data() {
			return {
				//按钮的宽度
				btn2Width: 70,
				//按钮的总宽
				deleteBtnWidth: 70,
				//正在滑动的索引
				scrollIndex: -1,
				//正在删除的索引
				deleteIndex: -1,
				//模拟数据
				msg: []
			}
		},
		methods: {
			getCollectList:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findMycollection", {openid:openid},
					function(res) {
						console.log(JSON.stringify(res));
						_self.msg = res.data;
					}
				);
			},
			goDetail:function(articleId){
				uni.navigateTo({
					url: '/pages/lawsDetail/lawsDetail?articleId='+articleId
				});
			},
			removeMsg: function(articleId) {
				_self.$qyc.request(
					"/f/mp/mplogin/cancelColect", {articleId:articleId,openid:openid},
					function(res) {
						_self.getCollectList();
					}
				);
				// var index = e.target.dataset.id;
				// //删除确认
				// if (this.deleteIndex != index) {
				// 	this.deleteIndex = index;
				// 	setTimeout(function() {
				// 		_self.deleteIndex = -1;
				// 	}, 2000);
				// 	return false;
				// }
				// this.scrollIndex = -1;
				// setTimeout(function() {
				// 	_self.msg.splice(index, 1);
				// 	_self.deleteIndex = -1;
				// }, 500);
			},
			touchStart: function(e) {
				x = e.mp.changedTouches[0].clientX;
				y = e.mp.changedTouches[0].clientY;
			},
			touchEnd: function(e) {
				x = x - e.mp.changedTouches[0].clientX;
				y = y - e.mp.changedTouches[0].clientY;
				if (Math.abs(x) < 50) {
					return;
				}
				if (Math.abs(x) < Math.abs(y)) {
					return;
				}
				var index = e.currentTarget.dataset.id;
				if (index == this.scrollIndex) {
					return;
				}
				_self.scrollIndex = index;
			}
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

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.grace-scroll-do {
		padding-left: 0;
	}

	.grace-scroll-do .grace-items {
		height: auto;
		padding-left: 30upx;
	}

	.grace-scroll-do scroll-view {
		width: 750upx;
		background: #fff;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		margin-top: 15upx;
	}

	.favorite-title {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		line-height: 26px;
	}

	.favorite-time {
		opacity: 0.5;
		font-size: 24upx;
		color: #000000;
	}

	.grace-scroll-do .btn {
		line-height: 174upx;
		background: #FF3B30;
		font-size: 36upx;
		padding: 0 !important;
	}
</style>
