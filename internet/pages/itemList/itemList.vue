<template>
	<view class="grace-padding">
		<view class="grace-cate">
			<scroll-view class="grace-cate-left" scroll-y="true">
				<view v-for="(item, index) in mainCate" :id="index" :key="index" :class="[currentCateIndex == index ? 'current' : '']"
				 @tap="changCate">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="grace-cate-right" scroll-y="true">
				<view class="grace-cate-sons" v-if="soncates.length > 0">
					<view v-for="(itemSon, indexSon) in soncates[currentCateIndex].nodes" :key="indexSon">
						<view class="grace-cate-sons-title grace-ellipsis-2">{{itemSon.name}}</view>
						<view class="grace-cate-sons-nav">
							<view class="grace-ellipsis-2" v-for="(sonsNav, indexSonsNav) in itemSon.nodes" :id="sonsNav.code" @tap="selectCate" :key="indexSonsNav">{{sonsNav.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
			this.getParentList();
		},
		data() {
			return {
				currentCateIndex: 0,
				//父级分类
				mainCate: [],
				//子分类
				soncates: []
			}
		},

		methods: {
			getParentList: function() {
				// uni.request({
				// 	url: _self.siteUrl+'/static/departments/000000.json',
				// 	success: (res) => {
				// 		_self.mainCate = res.data.splice(1, res.data.length);
				// 		this.getallData();
				// 	}
				// });
				_self.$qyc.request(
					"/static/departments/000000.json", {},
					function(res) {
						_self.mainCate = res.data.splice(1, res.data.length);
						this.getallData();
					}
				);
			},
			getallData: function() {
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.request(
					"/f/mp/mplogin/findItemList", {},
					function(res) {
						uni.hideLoading();
						_self.soncates = res.data.splice(1, res.data.length);
					}
				);
			},
			changCate: function(e) {
				var index = e.currentTarget.id;
				_self.currentCateIndex = index;
			},
			selectCate: function(e) {
				var cateId = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages/itemListDetail/itemListDetail?cateId=' + cateId
				});
				// uni.downloadFile({
				// 	url: 'http://xiaobei.j2eeall.com/static/1.pdf',
				// 	success: function(res) {
				// 		var filePath = res.tempFilePath;
				// 		console.log(filePath);
				// 		uni.openDocument({
				// 			filePath: filePath,
				// 			success: function(res) {
				// 				console.log('打开文档成功');
				// 			}
				// 		});
				// 	}
				// });
			}
		},
		components: {

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

	.grace-cate {
		height: 98.5%;
		top: 1.5%;
	}

	.grace-cate-left view {
		opacity: 0.5;
		font-size: 30upx;
		color: #000000;
		text-align: center;
		padding: 25upx 15upx;
		line-height: 50upx;
		height: initial;
	}

	.grace-cate-left view.current {
		opacity: 1;
		color: #3691B7;
	}

	.grace-cate-sons {
		padding: 15upx 4%;
		width: 92%;
	}

	.grace-cate-sons-title {
		line-height: 52upx;
		color: #000000;
		opacity: 0.8;
	}

	.grace-cate-sons-nav {
		border-bottom: 1rpx solid #D6D6D6;
	}

	.grace-cate-sons-nav:last-child {
		border: none;
	}

	.grace-cate-sons-nav view {
		width:96%;
		padding: 0;
		font-size: 28upx;
		color: #000000;
		opacity: 0.5;
		margin: 8upx 0;
		position: relative;
		padding-left:4%;
	}
	.grace-cate-sons-nav view:after{
		content: '';
		position: absolute;
		top:15upx;
		left:4upx;
		width:8upx;
		height:8upx;
		border-radius: 50%;
		background:#000000;
		opacity: 1 !important;
	}
	
</style>
