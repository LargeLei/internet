<template>
	<view class="grace-padding">
		<view class="grace-cate">
			<scroll-view class="grace-cate-left" scroll-y="true">
				<view v-for="(item, index) in mainCate" :id="index" :data-departmentCode='item.code' :key="index" :class="[currentCateIndex == index ? 'current' : '']"
				 @tap="changCate">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="grace-cate-right" scroll-y="true">
				<view class="grace-cate-sons" v-if="soncates.length > 0">
					<view v-for="(itemSon, indexSon) in soncates" :key="indexSon">
						<view class="grace-cate-sons-title grace-ellipsis-2">{{itemSon.name}}</view>
						<view class="grace-cate-sons-nav">
							<view class="grace-ellipsis-2" v-for="(sonsNav, indexSonsNav) in childCates" v-if="sonsNav.code==itemSon.code" :id="sonsNav.childInfor.code" @tap="selectCate" :key="indexSonsNav">{{sonsNav.childInfor.name}}</view>
						</view>
					</view>
				</view>
				<view @tap="changePage">
					<uni-load-more  :loadingType="loadingType"  :contentText="contentText" ></uni-load-more>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '../../components/uni-load-more.vue';
	var _self;
	export default {
		components: {//注册组件
			uniLoadMore
		},
		onLoad: function(option) {
			_self = this;
			this.getParentList();
		},
		
		data() {
			return {
				currentCateIndex: 0,
				//tabID
				departmentCode:'00000011',
				//页数
				pageNum:1,
				//单页条数
				pageNo:'7',
				//总数据
				total:'',
				//tab
				mainCate: [],
				//子分类
				soncates: [],
				childCates:[],
				loadingType: '0',
				contentText: {
					contentdown:'点击加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},

		methods: {
			getParentList: function() {
				_self.$qyc.getMatterUrl(
					"/ebus/jgsxz/departments/000000.json",{
						
					},
					function(res) {
						_self.mainCate = res;
						_self.getallData();
					}
				);
			},
			//首次加载数据
			getallData: function() {
				_self.pageNum = 1;
				_self.loadingType = '0';
				_self.childCates = [];
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.getMatterUrl(
					"/ebus/jgsxz/mainitem/"+_self.departmentCode+"/"+_self.pageNum+".json", {},
					function(res) {
						//console.log(res)
						_self.total = res.total;
						_self.soncates = res.list;
						//获取子类数据
					  　for (var i = 0;i<res.list.length;i++) {
							    let main_code = res.list[i].code,
									childObject = {
										childInfor : {
										}
									};
								_self.$qyc.getMatterUrl(
									"/ebus/jgsxz/subitem/"+main_code+".json", {},
									function(res) {
										console.log(res)
										uni.hideLoading();
										childObject.code = main_code;
										for(var i = 0;i<res.length;i++){
											childObject.childInfor.code = res[i].code;
											childObject.childInfor.name = res[i].name;
											_self.childCates.push(childObject);
										}
										//console.log(_self.childCates)
									}
								);
			　　　　　　 }
						if( _self.pageNum >= res.total/_self.pageNo){
							_self.loadingType = '2'
						}else{
							_self.loadingType = '0'
						}
					}
				);
			},
			//分页获取更多
			getMoreData: function() {
				_self.pageNum++;
				_self.loadingType = '1';
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.getMatterUrl(
					"/ebus/jgsxz/mainitem/"+_self.departmentCode+"/"+_self.pageNum+".json", {},
					function(res) {
						//console.log(res)
						uni.hideLoading();
						_self.total = res.total;
						_self.soncates = _self.soncates.concat(res.list)
						//console.log(_self.pageNum,res.total/_self.pageNo)
						//获取子类数据
					  　for (var i = 0;i<res.list.length;i++) {
								let main_code = res.list[i].code,
									childObject = {
										childInfor : {
										}
									};
								_self.$qyc.getMatterUrl(
									"/ebus/jgsxz/subitem/"+main_code+".json", {},
									function(res) {
										//console.log(res)
										uni.hideLoading();
										childObject.code = main_code;
										for(var i = 0;i<res.length;i++){
											childObject.childInfor.code = res[i].code;
											childObject.childInfor.name = res[i].name;
											_self.childCates.push(childObject);
										}
										//console.log(_self.childCates)
									}
								);
			　　　　　　 }
						if( _self.pageNum >= res.total/_self.pageNo){
							_self.loadingType = '2'
						}else{
							_self.loadingType = '0'
						}
						
					}
				);
			},
			//分页点击查看更多
			changePage:function(e){
				if( _self.loadingType == '0'){
					_self.getMoreData()
				}else{
					return false
				}
			},
			//tab切换
			changCate: function(e) {
				var index = e.currentTarget.id;
				_self.currentCateIndex = index;
				_self.departmentCode = e.currentTarget.dataset.departmentcode;
				_self.getallData();
				//console.log(e,_self.departmentCode)
			},
			//跳转详情
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
