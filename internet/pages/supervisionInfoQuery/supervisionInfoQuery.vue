<template>
	<view class="grace-padding">
		<!-- 搜索条 -->
		<view class="complaintSearch" style="width:98%; padding:20upx 2%;padding-right:0;flex-wrap:nowrap;">
			<view class="grace-search">
				<view class="grace-search-in">
					<image src="/static/imgs/Search_icon.png" mode="widthFix"></image>
					<input type="search" v-model="pickInfor" :value="pickInfor" placeholder="企业名称或统一社会信用代码" @input="searchChange"></input>
					<image src="/static/imgs/delect_icon.png" mode="widthFix" @tap="clearKey" v-if="searchClose"></image>
				</view>
				<view class="search-btn" @tap="searchNow()">搜索</view>
			</view>
		</view>
		<!-- tab -->
		<view class="seare-tab">
			<view class="tab-list" @tap="getJg(1)"><text>监管记录查询</text></view>
			<view class="tab-list" @tap="getJg(2)" v-for="(item,index) in jgsxImgList" :key='index' v-if="jgsxType == item.type">
				<text :style="{color: item.color}">监管事项查询</text>
				<image :src="item.url" mode=""></image>
			</view>
		</view>
		<view v-show="jlSxChoose" class="tab-list-choose" v-for="(item,index) in areaImgList" :key='index' v-if="areaType == item.type">
			<view class="list-item" :style="{color: item.color}" @tap="getArea(1)">
				<text>地方</text>
				<image :src="item.url" mode=""></image>
			</view>

			<picker-view v-if="visible" style="height: 450upx;" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="picker-item" v-for="(item1,index1) in area" :key="index1" :style="value[0] == index1?{color:chooseColor}:{color:''}">{{item1.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="(item1,index1) in area" :key="index1" :style="value[1] == index1?{color:chooseColor}:{color:''}">{{item1.name}}</view>
				</picker-view-column>
			</picker-view>
			<view class="list-item" @tap="getArea(2)">
				<text :style="{color:item.bwColor}">部委</text>
				<image :src="item.bwUrl" mode=""></image>
				<view style="clear: both;"></view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="search-item">
			<view class="search-list" v-for="(item, index) in searchList" :key="index" @tap="goSupervisionInfo(item.id)">
				<view><text>企业名称：</text><text>{{item.shopName}}</text></view>
				<view><text>统一社会信用代码：</text><text>{{item.shopId}}</text></view>
			</view>
		</view>
	</view>
</template>
<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	var _self;
	export default {
		onLoad: function(option) {
			_self = this;
		},
		data() {
			return {
				searchClose: false,
				pickInfor: '',
				visible: true,
				indicatorStyle: `height:50px;background:rgba(0,0,0,0.10);`,
				//地方名称
				value: [2, 2],
				chooseColor: '#3691B7',
				area: [{
					name: 'ceo'
				}, {
					name: 'cto'
				}, {
					name: 'coo'
				}, {
					name: 'ceo'
				}, {
					name: 'cto'
				}, {
					name: 'coo'
				}],
				//地方部门名称
				department: [],
				//监管记录、事项选择
				jlSxChoose: true,
				jgsxType: 2,
				jgsxImgList: [{
					color: '#000',
					type: 1,
					url: '/static/imgs/arrow_down_ls_icon.png'
				}, {
					color: '#3691B7',
					type: 2,
					url: '/static/imgs/arrow_up_ls_icon.png'
				}],
				//地方、部委选择
				areaType: 2,
				areaImgList: [{
					color: '#000',
					bwColor: '#3691B7',
					type: 1,
					url: '/static/imgs/bm-down.png',
					bwUrl: '/static/imgs/bwxxx.png'
				}, {
					color: '#3691B7',
					bwColor: '#000',
					type: 2,
					url: '/static/imgs/bm-up.png',
					bwUrl: ''
				}],

			}
		},
		methods: {
			//监管记录、事项选切换
			getJg(type) {
				if (type == 1) {
					this.jlSxChoose = false
					this.jgsxType = 1
				} else {
					this.jlSxChoose = true
					this.jgsxType = 2
					this.areaType = 2
					this.visible = true
				}
			},
			//部门及部委切换
			getArea(type) {
				if (type == 1) {
					this.areaType = 2
					this.visible = true
					// if (this.visible == false) {
					// 	this.visible = true
					// } else {
					// 	this.visible = false
					// }
				} else {
					this.areaType = 1
					this.pickInfor = ''
					this.visible = false
				}
			},
			//地方以及部门选择
			bindChange: function(e) {
				console.log(e)
				const val = e.detail.value
				this.value = val
				console.log(e, this.value)
				this.pickInfor = this.area[val[1]].name
			},
			//搜索
			searchChange: function(e) {
				var key = e.detail.value;
				this.pickInfor = key;
				if (key.length >= 1) {
					this.searchClose = true;
				} else {
					this.clearKey();
				}
			},
			clearKey: function() {
				this.searchClose = false;
				this.pickInfor = "";
			},
			searchNow: function() {
				console.log(this.pickInfor)
				//if (_self.searchKey.length >= 1) {
				// uni.showLoading({
				// 	title: '搜索中...'
				// });
				// _self.historyShow = false;
				// _self.$qyc.interfaceRequest(
				// 	"/ebus/tsjb/unittype/getchildlistbyparentcode", {
				// 		keywords: _self.searchKey,
				// 		parentCode: "0000"
				// 	},
				// 	function(res) {
				// 		console.log(res)
				// 		uni.hideLoading();
				// 		_self.historyTemp = _self.searchKey + '|' + _self.historyTemp.split('|').filter(e => e != _self.searchKey).join(
				// 			'|');
				// 		uni.setStorageSync('history', _self.historyTemp);
				// 		if (res.data.length > 0) {
				// 			_self.searchList = res.data;
				// 		} else {
				// 			_self.show = true;
				// 		}
				// 	}
				// );
				//}
			},
		}
	}
</script>
<style lang="less">
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

	/* complaintSearch */
	.complaintSearch {
		width: 100%;
		background: #F8F9FC;
	}

	.seare-tab {
		display: -webkit-box;
		text-align: center;
		background: #fff;
		border-bottom: 1px solid rgba(214, 214, 214, 0.50);

		.tab-list {
			-webkit-box-flex: 1;
			padding: 16upx 0;

			image {
				width: 40upx;
				height: 40upx;
				vertical-align: middle
			}
		}
	}

	.tab-list-choose {
		background: #fff;

		.list-item {
			padding: 24upx 36upx;
			box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50);

			image {
				width: 46upx;
				height: 36upx;
				vertical-align: middle;
				float: right
			}
		}
	}

	.picker-item {
		text-align: center;
		line-height: 100upx;
	}

	.grace-search-in {
		background: #FFFFFF;
		box-shadow: 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		border-radius: 6px;
		height: 80upx;
		padding: 0;
		align-items: center;
		width: 100%;
		flex: 1;
	}

	.grace-search-in input {
		height: 80upx;
	}

	.grace-search-in image {
		width: 64upx;
		height: 64upx;
		margin-left: 24upx;
	}

	.search-btn {
		opacity: 0.8;
		font-weight: bold;
		font-size: 30upx;
		color: #3691B7;
		padding: 0 30upx;
		line-height: 80upx;
	}

	/* search-item */
	.search-item {
		background: #FFFFFF;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
		padding: 0 30upx;
	}

	.search-list {
		padding: 20upx 0;
		border-bottom: 2upx solid rgba(214, 214, 214, 0.50);
	}

	.search-list:last-child {
		border: none;
	}

	.search-list view {
		opacity: 0.8;
		font-size: 30upx;
		color: #000000;
		line-height: 52upx;
	}
</style>
