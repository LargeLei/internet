
<template>
	<view class="grace-padding">
		<view class="rate">
			
			<view class="rate-list" v-for="(item, index) in steps" :key="index">
				<view class="numerical-two">0{{index+1}}</view>
				<view class="rate-list-detail">
					<view><text class="rate-list-time">{{item.informationStep.createDate}}</text></view>
					<view><text class="rate-list-title">处理单位：</text><text class="rate-list-text">{{item.informationStep.orgName}}</text></view>
					<view><text class="rate-list-title">处理方式：</text><text class="rate-list-text">{{
						item.informationStep.stateCode == 1?"受理":
						item.informationStep.stateCode == 2?"办结":
						item.informationStep.stateCode == 3?"交办":
						item.informationStep.stateCode == 4?"上报":
						item.informationStep.stateCode == 9?"无效":"未知"
						}}</text></view>
					<view><text class="rate-list-title">文件：</text><text class="rate-list-text">暂无</text></view>
				</view>
			</view>
			
		</view>
		<view class="demand">
			<view v-if="data.userName"><text class="rate-list-title">姓名：</text><text class="rate-list-text">{{data.userName}}</text></view>
			<view v-if="data.userAddress"><text class="rate-list-title">联系地址：</text><text class="rate-list-text">{{data.userAddress}}</text></view>
			<view v-if="data.reportObject"><text class="rate-list-title">举报对象：</text><text class="rate-list-text">{{data.reportObject}}</text></view>
			<view v-if="data.reportTypeName"><text class="rate-list-title">举报问题类型：</text><text class="rate-list-text">{{data.reportTypeName}}</text></view>
			<view v-if="data.reportTerritory"><text class="rate-list-title">举报属地：</text><text class="rate-list-text">{{data.reportTerritory}}</text></view>
			<view v-if="data.serviceTypeName"><text class="rate-list-title">商品/服务类型：</text><text class="rate-list-text">{{data.serviceTypeName}}</text></view>
			<view v-if="data.serviceName"><text class="rate-list-title">商品/服务名称：</text><text class="rate-list-text">{{data.serviceName}}</text></view>
			<view v-if="data.occurplace"><text class="rate-list-title">发生地点：</text><text class="rate-list-text">{{data.occurplace}}</text></view>
			<view v-if="data.brand"><text class="rate-list-title">品牌：</text><text class="rate-list-text">{{data.brand}}</text></view>
			<view v-if="data.shoppingName"><text class="rate-list-title">购物方式：</text><text class="rate-list-text">{{data.shoppingName}}</text></view>
			<view v-if="data.orderNumber"><text class="rate-list-title">订单号：</text><text class="rate-list-text">{{data.orderNumber}}</text></view>
			<view v-if="data.reportDetail"><text class="rate-list-title">举报内容：</text><text class="rate-list-text">{{data.reportDetail}}</text></view>
			<view v-if="data.ispublic"><text class="rate-list-title">是否可公开：</text><text class="rate-list-text">{{data.ispublic == 0?"公开":"不公开"}}</text></view>
			<view><text class="rate-list-title">附件：</text><text class="rate-list-text">{{accessory}}</text></view>
		</view>
		
		<view class="suggest">
			<view class="grace-space-between suggest-list" style="border-bottom:2upx solid #DDDDDD;">
				<text>是否满意</text><image :src="suggestImg" mode='widthFix' @tap="satisfaction"></image>
			</view>
			<view class="grace-form">
				<view class="grace-items">
					<view class="grace-label">评价</view> 
					<view class="grace-form-r">
						<picker @change="bindPickerChange" :value="evaluateIndex" range-key="feedBackName" :range="evaluate" name="evaluate">
							<text>{{evaluate[evaluateIndex].feedBackName}}</text>
						</picker>
					</view>
				</view>
			</view>	
			<view style="padding:40upx 0;">
				<button @tap="saveSuggest" type="">提交</button>
			</view>
		</view>
	</view>
</template>
<script>	
	var _self;
	var reportId;
	export default {
		onLoad: function(option) {
			_self = this;
			reportId = option.id;
			this.loadReportData();
		},
		data() {
			return {
				//进度
				steps:[],
				//处理详情
				data:{
					userName:"",
					userAddress:'',
					reportObject:"",
					reportTerritory:'',
					territory:'',
					serviceType:'',
					serviceName:'',
					brand:'',
					shoppingMode:'',
					orderNumber:'',
					reportDetail:'',
					ispublic:'',
					accessory:'空调照片、发票照片'
				},
				islike:0,
				suggestImg:'../../static/imgs/dz_yd_icon.png',
				evaluateIndex: 0,
				evaluate: [
					{'feedBackCode':'0','feedBackName':'满意'},
					{'feedBackCode':'1','feedBackName':'基本满意'},
					{'feedBackCode':'2','feedBackName':'不满意'}
				],
				suggest:0
			}
		},
		methods: {
			bindPickerChange: function(e) {
				_self.suggest = _self.evaluate[e.detail.value].feedBackCode;
				this.evaluateIndex = e.detail.value;
			},
			
			loadReportData:function(){
				uni.showLoading({
					title: '加载中...'
				});
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/reportinformation/getreportinformationbyid", {id:reportId},
					function(res) {
						uni.hideLoading();
						console.log(res.data)
						if(res.success){
							_self.data = res.data;
							_self.islike = res.data.islike
							if(res.data.islike == 1){
								_self.suggestImg = '../../static/imgs/dz_wd_icon.png'
							}
							if(res.data.evaluation != null){
								_self.evaluateIndex = res.data.evaluation
							}
							
						}
					}
				);
			},
			//点赞图标切换
			satisfaction:function(){
				if (this.suggestImg == "../../static/imgs/dz_yd_icon.png") {
					_self.islike = 1;
					this.suggestImg = "../../static/imgs/dz_wd_icon.png"
				} else{
					_self.islike = 0;
					this.suggestImg = "../../static/imgs/dz_yd_icon.png"
				}
			},
			
			//提交
			saveSuggest :function(){
				uni.showLoading({
					title: '正在提交...'
				});
				//console.log(_self.suggest,_self.islike)
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/reportinformation/updatereportinformation", {
						id:reportId,
						evaluation:_self.suggest,
						islike:_self.islike
						},
					function(res) {
						uni.hideLoading();
						if(res.success){
							uni.showToast({
								title: "感谢您的评价!",
								duration: 2000,
								icon: 'success'
							});
							setTimeout(function(){
								_self.$qyc.closeWin(true);		
							}, 2000);
						}
					}
				);
			}
			
		}
	}
</script>
<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.grace-ellipsis-2 {display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.rate{padding:0 15upx;}
	.rate-list{background: #FFFFFF;border:1upx solid #CCCCCC;border-radius: 10upx;margin-top:15upx;display: flex;overflow: hidden;}
	.numerical-one{width:140upx;background: rgba(54,145,183,0.10);font-size:60upx;color: #3691B7;opacity: 0.5;display: flex;justify-content: center;align-items: center;}
	.numerical-two{width:140upx;background: rgba(54,145,183,0.30);font-size:60upx;color: #3691B7;opacity: 0.65;display: flex;justify-content: center;align-items: center;}
	.numerical-three{width:140upx;background: rgba(54,145,183,0.50);font-size:60upx;color: #3691B7;opacity: 0.8;display: flex;justify-content: center;align-items: center;}
	.rate-list-detail{width:100%;flex: 1;padding:10upx 30upx;}
	.rate-list-detail view{line-height:52upx;}
	.rate-list-time,.rate-list-title{opacity: 0.5;font-size:28px;color: #000000;margin-right:6upx;}
	.rate-list-text{opacity: 0.8;font-size:28upx;color: #000000;flex: 1;}
	.demand{background:#fff;margin-top:20upx;padding:10upx 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.demand>view{line-height:52upx;display: flex;padding:6upx 0;}
	.suggest{margin-top:20upx;background:#fff;padding:10upx 30upx;}
	.suggest-list{line-height: 64upx;padding:15upx 0;}
	.suggest-list text{opacity: 0.8;font-size: 28upx;color: #000000;}
	.suggest-list image{width:64upx;height:64upx;}
	.suggest-textarea textarea{background: #F8F8F8;border: 2upx solid #D6D6D6;border-radius: 4px;height:160upx;width: 96%;padding:20upx 2%;font-size: 28upx;color:#000;opacity: 0.8;}
	button{background:#3691B7;color:#fff;}
	button:active{background:#3691B7;color:#fff;}
</style>
