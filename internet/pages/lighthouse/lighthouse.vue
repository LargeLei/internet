<template>
	<view class="grace-padding">
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(tab, index) in tabs" :key="index" :data-resourceid='tab.resourceid' :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id='index'
			 @tap="tabChange">{{tab.resourcename}}</view>
		</scroll-view>
		<!-- 循环新闻项目 -->
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<swiper-item v-for="(tab, indexs) in tabs" :key="indexs"  >
				<scroll-view  v-for="(news, newsIndex) in infors" :key="newsIndex" scroll-y="true"  :data-scindex="newsIndex" @scrolltolower="scrollend">
					<view class="light">
						<view class="no-infor" v-if="news.resourcetitle.length == 0">---暂无数据---</view>
						<view v-else>
							<view class="light-list" v-for="(item, index) in news.resourcetitle" :key="index" @tap="goLighthouseDetail(item.titleid)">
								<view class="grace-ellipsis-2">{{item.titletext}}</view>
								<text>{{item.time }}</text>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	var _self;
	var data = [];
	var currentDicvalue = 1;
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	export default {
		
		onLoad: function(option) {
			_self = this;
			this.getHeadType();
		},
		data() {
			return {
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				resourceid:33,
				tabs: [],
				newsAll: [
					[]
				],
				infors:[]
			}
		},

		onReady: function() {
			//获取屏幕高度及比例
			var winInfo = uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					var dom = uni.createSelectorQuery().select('#grace-tab-title')
					dom.fields({
						size: true
					}, res2 => {
						if (!res2) {
							return;
						}
						//计算得出滚动区域的高度
						_self.tabHeight = windowHeight - res2.height;
					}).exec();
				}
			});
		},
		methods: {
			getHeadType: function() {
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/cates.do", {
						cateid : 31,
						siteid : 1
					},
					function(res) {
						//console.log(res)
						_self.tabs = res.resource;
						_self.getArticleList();
					}
				);
			},
			getArticleList: function() {
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infolist.do", {
						resourceid : _self.resourceid,
						siteid : 1
					},
					function(res) {
						uni.hideLoading();
						_self.infors = res.resource;
					}
				);
			},
			goLighthouseDetail: function(articleId) {
				uni.navigateTo({
					url: '/pages/lawsDetail/lawsDetail?articleId=' + articleId
				});
			},
			// 切换
			tabChange: function(e) {
				var index = e.currentTarget.id;
				_self.swiperCurrentIndex = index;
				_self.tabCurrentIndex = index;
				_self.resourceid = e.currentTarget.dataset.resourceid;
				_self.getArticleList();
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				_self.tabCurrentIndex = index;
				for(var i =0 ; i<_self.tabs.length; i++){
					if(index == i){
						_self.resourceid = _self.tabs[i].resourceid
					}
				}
				_self.getArticleList();
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				//获取是哪个选项滚动到底？
				var index = e.currentTarget.dataset.scindex;
				//判断当前是否正在加载
				if (_self.tabs[index].loadingType === 1) {
					return false;
				}
			}
		},
		components: {
			graceLoading
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
	.no-infor{
		text-align: center;
		margin: 30upx 0;
		color:#999;
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

	.grace-tab-title {
		background: #fff;
		height: 96upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.grace-tab-title view {
		height: 96upx;
		line-height: 96upx;
		background: #fff;
		border: none;
		color: #000000;
		opacity: 0.5;
		font-size: 28upx;
	}

	.grace-tab-title view:first-child {
		margin-left: 16upx;
	}

	.grace-tab-title view:last-child {
		margin-right: 16upx;
	}

	.grace-tab-title view.grace-tab-current {
		border: none !important;
		font-size: 30upx;
		color: #3691B7;
		font-weight: bold;
		position: relative;
		opacity: 1;
	}

	.grace-tab-current:after {
		content: "";
		position: absolute;
		width: 34upx;
		height: 4upx;
		bottom: 0;
		left: 50%;
		margin-left: -17upx;
		background: #3691B7;
		border-radius: 2upx;
	}

	.light {
		width: 750upx;
	}

	.light .light-list {
		background: #fff;
		padding: 20upx 30upx;
		box-shadow: 0 2upx 0 0 rgba(214, 214, 214, 0.50), 0 2upx 28upx 0 rgba(9, 63, 127, 0.05);
		margin-top: 15upx;
	}

	.light .light-list:last-child {
		border: none;
	}

	.light .light-list view {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		text-align: justify;
		line-height: 52upx;
	}

	.light .light-list text {
		opacity: 0.5;
		font-size: 24upx;
		color: #000000;
		text-align: justify;
	}

	.laws {
		background: #fff;
	}
</style>
