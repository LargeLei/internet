
<template>
	<view class="grace-padding">
		<view class="rate">
			<view class="rate-list">
				<view class="numerical-one">01</view>
				<view class="rate-list-detail">
					<view><text class="rate-list-time">{{rateTimeOne}}</text></view>
					<view><text class="rate-list-title">处理单位：</text><text class="rate-list-text">北京市监督管理局</text></view>
					<view><text class="rate-list-title">处理方式：</text><text class="rate-list-text">受理</text></view>
				</view>
			</view>
			<view class="rate-list">
				<view class="numerical-two">02</view>
				<view class="rate-list-detail">
					<view><text class="rate-list-time">{{rateTimeTwo}}</text></view>
					<view><text class="rate-list-title">处理单位：</text><text class="rate-list-text">北京市监督管理局</text></view>
					<view><text class="rate-list-title">处理方式：</text><text class="rate-list-text">受理</text></view>
					<view><text class="rate-list-title">去向：</text><text class="rate-list-text">北京市丰台区市场监督管理局</text></view>
				</view>
			</view>
			<view class="rate-list">
				<view class="numerical-three">03</view>
				<view class="rate-list-detail">
					<view><text class="rate-list-time">{{rateTimethree}}</text></view>
					<view><text class="rate-list-title">处理单位：</text><text class="rate-list-text">北京市监督管理局</text></view>
					<view><text class="rate-list-title">处理方式：</text><text class="rate-list-text">办结</text></view>
				</view>
			</view>
		</view>
		<view class="demand">
			<view><text class="rate-list-title">姓名：</text><text class="rate-list-text">{{username}}</text></view>
			<view><text class="rate-list-title">联系地址：</text><text class="rate-list-text">{{location}}</text></view>
			<view><text class="rate-list-title">投诉对象：</text><text class="rate-list-text">{{complaint}}</text></view>
			<view><text class="rate-list-title">名称：</text><text class="rate-list-text">{{name}}</text></view>
			<view><text class="rate-list-title">住所：</text><text class="rate-list-text">{{abode}}</text></view>
			<view><text class="rate-list-title">投诉问题类型：</text><text class="rate-list-text">{{type}}</text></view>
			<view><text class="rate-list-title">投诉属地：</text><text class="rate-list-text">{{territory}}</text></view>
			<view><text class="rate-list-title">商品/服务类型：</text><text class="rate-list-text">{{serviceType}}</text></view>
			<view><text class="rate-list-title">商品/服务名称：</text><text class="rate-list-text">{{serviceName}}</text></view>
			<view><text class="rate-list-title">品牌：</text><text class="rate-list-text">{{brand}}</text></view>
			<view><text class="rate-list-title">购物方式：</text><text class="rate-list-text">{{shoppingWay}}</text></view>
			<view><text class="rate-list-title">订单号：</text><text class="rate-list-text">{{order}}</text></view>
			<view><text class="rate-list-title">型号规格：</text><text class="rate-list-text">{{model}}</text></view>
			<view><text class="rate-list-title">数量：</text><text class="rate-list-text">{{num}}</text></view>
			<view><text class="rate-list-title">计量单位：</text><text class="rate-list-text">{{units}}</text></view>
			<view><text class="rate-list-title">消费金额：</text><text class="rate-list-text">{{consumption}}</text></view>
			<view><text class="rate-list-title">消费日期：</text><text class="rate-list-text">{{consumptionDate}}</text></view>
			<view><text class="rate-list-title">争议发生日期：</text><text class="rate-list-text">{{occurrenceDate}}</text></view>
			<view><text class="rate-list-title">投诉内容：</text><text class="rate-list-text">{{complaintDetail}}</text></view>
			<view><text class="rate-list-title">诉求内容：</text><text class="rate-list-text">{{content}}</text></view>
			<view><text class="rate-list-title">有无跟经营者和解：</text><text class="rate-list-text">{{reconciliation}}</text></view>
			<view><text class="rate-list-title">是否可公开：</text><text class="rate-list-text">{{public}}</text></view>
			<view><text class="rate-list-title">附件：</text><text class="rate-list-text">{{accessory}}</text></view>
		</view>
		<view class="suggest">
			<form @submit="formSubmit">
				<view class="grace-space-between suggest-list" style="border-bottom:2upx solid #DDDDDD;">
					<text>是否满意</text><image :src="suggestImg" mode='widthFix' @tap="satisfaction"></image>
				</view>
				<view class="suggest-textarea">
					<view class="suggest-list">
						<text>评价留言</text>
					</view>
					<textarea placeholder-style="opacity: 0.3" placeholder="占位符字体是红色的"/>
				</view>
				
				<view style="padding:40upx 0;">
					<button @tap="addImg" type="">提交</button>
				</view>
			</form>	
		</view>
	</view>
</template>
<script>	
	var _self,titleId;
	export default {
		onLoad: function(option) {
			_self = this;
			titleId="";
			if(option.titleId){
				titleId = option.titleId;
			}
			this.getComplaintList();
		},
		data() {
			return {
				//进度
				rateTimeOne:"2019年04月02日",
				rateTimeTwo:"2019年04月02日",
				rateTimethree:"2019年04月02日",
				
				//处理详情
				username:"张静宜",
				location:'北京市丰台区总部基地二区**号楼***室',
				complaint:"企业",
				name:'雷电空调生产厂',
				abode:'福州连江XX路XX号',
				type:'安全生产',
				territory:'北京',
				serviceType:'商品-家用电器-空调',
				serviceName:'雷电空调',
				brand:'雷电',
				shoppingWay:'门店',
				order:'sn45487820190401',
				model:'aj008',
				num:'1',
				units:'台',
				consumption:'800',
				consumptionDate:'2019/04/01',
				occurrenceDate:'2019/04/25',
				complaintDetail:'空调管线漏电',
				content:'希望退货',
				reconciliation:'无',
				public:'可公开',
				accessory:'空调照片、发票照片',
				
				//表单
				suggestImg:'../../static/imgs/dz_yd_icon.png'
			}
		},
		
		methods: {
			satisfaction:function(){
				if (this.suggestImg == "../../static/imgs/dz_yd_icon.png") {
					this.suggestImg = "../../static/imgs/dz_wd_icon.png"
				} else{
					this.suggestImg = "../../static/imgs/dz_yd_icon.png"
				}
			},
			
			
			getComplaintList: function() {
				_self.$qyc.selfRequest(
					"/jmportal_server/interfaces/infocontent.do", {
						titleid:titleId,
						siteid:1
					},
					function(res) {
							console.log(res)
							//_self.light = res.resource;
					}
				);
			},
			
			//提交
			addImg :function(){
				uni.chooseImage({
					sizeType: ['compressed'],
					success: function(chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: '', //开发自己写
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								//'user': 'test'
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
			},
			formSubmit: function(e) {
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
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
	.rate-list-time,.rate-list-title{opacity: 0.5;font-size:28px;color: #000000;}
	.rate-list-text{opacity: 0.8;font-size:28upx;color: #000000;flex: 1;}
	.demand{background:#fff;margin-top:20upx;padding:10upx 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.demand>view{line-height:52upx;display: flex;}
	.suggest{margin-top:20upx;background:#fff;padding:10upx 30upx;}
	.suggest-list{line-height: 64upx;padding:15upx 0;}
	.suggest-list text{opacity: 0.8;font-size: 28upx;color: #000000;}
	.suggest-list image{width:64upx;height:64upx;}
	.suggest-textarea textarea{background: #F8F8F8;border: 2upx solid #D6D6D6;border-radius: 4px;height:160upx;width: 96%;padding:20upx 2%;font-size: 28upx;color:#000;opacity: 0.8;}
	button{background:#3691B7;color:#fff;}
	button:active{background:#3691B7;color:#fff;}
</style>
