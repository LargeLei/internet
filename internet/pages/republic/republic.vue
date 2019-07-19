
<template>
	<view class="grace-padding">
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index+',tabId-'+tab.dictValue" @tap="tabChange">{{tab.dictLabel}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
				<scroll-view scroll-y="true" :data-scindex="newsIndex" @scrolltolower="scrollend">	
					<view class="light">
						<view class="light-list" v-for="(item, index) in news" :key="index">
							<view class="grace-ellipsis-2">{{item.newsTitle}}</view>
							<text>{{item.createDate}}</text>
						</view>
					</view>
					<!-- <graceLoading :loadingType="tabs[newsIndex].loadingType"></graceLoading> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>	
	var _self;
	var data = [];
	var indexDefault;
	import graceLoading from "../../graceUI/components/graceLoading.vue"
	export default {
		onLoad:function(option){
			_self = this;
			indexDefault = option.index;
			this.getHeadType();
			// this.getArticleList();
		},
		data() {
			return {
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight : 300,
				tabs: [],
				newsAll: [
					[{
						'newsTitle':'监管信息公开',
						'newsTitle':'监管信息公开',
						'newsTitle':'监管信息公开',
						'newsTitle':'监管信息公开',
						'newsTitle':'监管信息公开',
						'newsTitle':'监管信息公开'
					}],
					[{
						'newsTitle':'基本流程公开',
						'newsTitle':'基本流程公开',
						'newsTitle':'基本流程公开',
						'newsTitle':'基本流程公开',
						'newsTitle':'基本流程公开',
						'newsTitle':'基本流程公开'
					}],
					[{
						'newsTitle':'监管计划公开',
						'newsTitle':'监管计划公开',
						'newsTitle':'监管计划公开',
						'newsTitle':'监管计划公开',
						'newsTitle':'监管计划公开',
						'newsTitle':'监管计划公开'
					}],
					[{
						'newsTitle':'人员信息公开',
						'newsTitle':'人员信息公开',
						'newsTitle':'人员信息公开',
						'newsTitle':'人员信息公开',
						'newsTitle':'人员信息公开',
						'newsTitle':'人员信息公开'
					}],
					[{
						'newsTitle':'监管事项公开',
						'newsTitle':'监管事项公开',
						'newsTitle':'监管事项公开',
						'newsTitle':'监管事项公开',
						'newsTitle':'监管事项公开',
						'newsTitle':'监管事项公开'
					}],
					[{
						'newsTitle':'监管纪律公开',
						'newsTitle':'监管纪律公开',
						'newsTitle':'监管纪律公开',
						'newsTitle':'监管纪律公开',
						'newsTitle':'监管纪律公开',
						'newsTitle':'监管纪律公开'
					}]
					
				]
			}
		},
		
		onReady: function () {
			//获取屏幕高度及比例
			var winInfo = uni.getSystemInfo({
				success: function (res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					var dom = uni.createSelectorQuery().select('#grace-tab-title')
					dom.fields({size: true}, res2 => {
						if(!res2){return ;}
						//计算得出滚动区域的高度
						_self.tabHeight = windowHeight - res2.height;
					}).exec();
				}
			});
		},
		methods:{
			getHeadType:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findDiclable", {dicType:'wx_regulatory_types'},
					function(res) {
						_self.tabs = res.data;
					}
				);
			},
			getArticleList:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/findArticleList", {newsType:0},
					function(res) {
						data = res.data;
						_self.newsAll = [data.filter(function (e) { return e.typeLighthouse == _self.tabs[0].dictValue; })];
					}
				);
			},
			// goLighthouseDetail:function(articleId){
			// 	uni.navigateTo({
			// 		url: '/pages/lawsDetail/lawsDetail?articleId='+articleId
			// 	});
			// },
			// 切换
			tabChange: function (e) {
				var str = e.target.id;
				var arr=str.split(",");
				var index = arr[0].replace('tabTag-', '');
				var value = arr[1].replace('tabId-', '');
				// _self.newsAll[index] = data.filter(function (e) { return e.typeLighthouse == value; });
				_self.swiperCurrentIndex = index;
				_self.tabCurrentIndex    = index;
			},
			swiperChange: function(e){
				var index = e.detail.current;
				_self.tabCurrentIndex = index;
			},
			//每个选项滚动到底部
			scrollend:function(e){
				//获取是哪个选项滚动到底？
				var index = e.currentTarget.dataset.scindex;
				console.log(index);
				//可以利用 tabs 携带的分类id 与服务器交互请求对应分类的数据
				console.log(_self.tabs[index].id);
				//加载更多的演示
				//判断当前是否正在加载
				if (_self.tabs[index].loadingType === 1){
					return false;
				}
				//判断是否是最后一页
				console.log(_self.tabs[index].page)
				if (_self.tabs[index].page > 3){
					_self.tabs[index].loadingType = 2;//全部
					return ;
				}
				_self.tabs[index].loadingType = 1;//加载中
				//模拟延迟
				setTimeout(function(){
					_self.newsAll[index] = _self.newsAll[index].concat(news);
					//分页
					_self.tabs[index].page++;
					_self.tabs[index].loadingType = 0;//恢复加载状态
					//
				}, 1000);
			}
		},
		components:{
			graceLoading
		}
	}
</script>

<style>
	::-webkit-scrollbar{width: 0;height: 0;color:transparent;}
	page{background: #F8F9FC;}
	.grace-ellipsis-2 {display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.grace-padding{padding:0;width: 100%;}
	.grace-tab-title {background:#fff;height:96upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.grace-tab-title view{height:96upx;line-height: 96upx;background:#fff;border:none;color: #000000;opacity: 0.5;font-size:28upx;}
	.grace-tab-title view:first-child{margin-left:16upx;}
	.grace-tab-title view:last-child {margin-right:16upx;}

	.grace-tab-title view.grace-tab-current{border:none !important;font-size:30upx;color: #3691B7;font-weight: bold;position: relative;opacity: 1;}
	.grace-tab-current:after{content: "";position: absolute;width:34upx;height:4upx;bottom:0;left:50%;margin-left:-17upx;background:#3691B7;border-radius: 2upx;}
	.light {width:750upx;}
	.light .light-list{background:#fff;padding:20upx 30upx;box-shadow: 0 2upx 0 0 rgba(214,214,214,0.50), 0 2upx 28upx 0 rgba(9,63,127,0.05);margin-top:15upx;}
	.light .light-list:last-child{border: none;}
	.light .light-list view{opacity: 0.8;font-size:30upx;color: #000000;text-align: justify;line-height:52upx;}
	.light .light-list text{opacity: 0.5;font-size:24upx;color: #000000;text-align: justify;}
	.laws{background:#fff;}
</style>
