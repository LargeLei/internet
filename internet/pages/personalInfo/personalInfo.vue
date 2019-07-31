<template>
	<view class="grace-padding">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="basic-head">基础信息</view>
				<view class="basicInfo">
					<view><text class="basicInfo-title">姓名：</text><text class="basicInfo-text">{{username}}</text></view>
					<view><text class="basicInfo-title">性别：</text><text class="basicInfo-text">{{gender}}</text></view>
					<view><text class="basicInfo-title">出生日期：</text><text class="basicInfo-text">{{birth}}</text></view>
					<view><text class="basicInfo-title">绑定手机号：</text><text class="basicInfo-text">{{cellPhone}}</text></view>
				</view>
				<view class="basic-head">常用信息</view>
				<view class="common">
					<view class="grace-items">
						<view class="grace-label">户籍所在地</view>
						<view @click="cityPicker1" class="grace-form-r">
							{{cityText1}}
							<text class="grace-iconfont icon-arrow-right"></text>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">民族</view>
						<view class="grace-form-r">
							<picker @change="bindNationChange" :value="nationIndex" :range="nation" name="nation">
								<text>{{nation[nationIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" v-model="location" name="location" placeholder="请输入收件地址"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">手机号</view>
						<input type="text" class="input" v-model="mobile" name="mobile" placeholder="请输入手机号"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">电子邮件</view>
						<input type="text" class="input" v-model="email" name="email" placeholder="请输入电子邮件"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">紧急联系人</view>
						<input type="text" class="input" v-model="emergency" name="emergency" placeholder="请输入紧急联系人"></input>
					</view>
					<!-- <view class="grace-items grace-noborder">
						<view class="grace-label" style="width:200upx;line-height:60upx;height:60upx;">自动填写信息</view>
						<switch color="#3691B7" @change="switchChange"></switch>
					</view>
					<view class="hint">办理业务时将自动为您填入个人信息</view> -->
					
				</view>
				
				<view style="padding:40upx 0;">
					<button formType="submit" @tap="saveUsersBase" type="" style="width:96%;">保存</button>
				</view>
			</form>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1" @onCancel="onCancel1" @onConfirm="onConfirm1"></mpvue-city-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../threeComponents/mpvueCityPicker.vue';
	var  graceChecker = require("../../graceUI/graceChecker.js");
	
	var _self;
	export default {
		
		onLoad:function(option) {
			_self = this;
			this.getUsers();
		},
		data() {
			return {
				//基本信息
				username:"",
				gender: '',
				birth: "",
				cellPhone:"",				
				//常用信息
					//户籍所在地
				themeColor: '#3691B7', //颜色
				cityText1 : "请选择户籍所在地", //文本
				cityPickerValueDefault1 : [0,0,1], //默认选项
				//记录全部信息用于表单提交
				city1 : null,
				//民族
				nationIndex: 0,
				nation: ['汉族', '回族','维吾尔族','傣族'],
				location:"",
				mobile:"",
				email:"",
				emergency:"",	
				userid:"",
				cityValue:"",
				autofill:true
			}
		},
		methods: {
			//民族选择
			bindNationChange: function(e) {
				console.log(e);
				this.nationIndex = e.detail.value;
			},
			//地区选择
			cityPicker1 : function(){
				this.$refs.mpvueCityPicker1.show();
			},
			// switchChange: function (e){	
			// 	this.autofill =  e.target.value;	
			// },
			
			onConfirm1(e) {
				var cityText1  = e.label;
				var cityValue1 = e.value;
				var cityCode1  = e.cityCode;
				
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			bindPickerChange: function(e) {
				this.genderIndex = e.detail.value;
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			formSubmit: function(e) {
				//定义表单规则
				// var rule = [
				// 	{name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
				// 	{name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
				// 	{name:"bd", checkType : "notsame", checkRule:"请选择",  errorMsg:"请选择生日"},
				// 	{name:"phone", checkType : "phoneno", checkRule:"1,11",  errorMsg:"手机号应为11个数字"},
				// 	{name:"email", checkType : "email", checkRule:"",  errorMsg:"请填写您的邮箱"}
				// ];
				// if(this.city1 == null || this.city2 == null){
				// 	uni.showToast({title : "请选择城市", icon:"none"});
				// 	return ;
				// }
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			getUsers: function(e) {
				_self.$qyc.request(
					"/f/wx/wxUser/getApproveStatus", {
						openid: uni.getStorageSync('openid')
					},
					function(res) {
						console.log(res)
						if(res.data != undefined && res.data != 'undefined'){
							var users = res.data;
							_self.userid=users.id;
							_self.username = users.trueName;
							if(users.sex == 0){
								_self.gender = "女";
							}else{
								_self.gender = "男";
							}			
							_self.birth = users.birth != null ? users.birth:'1997-02-12';
							_self.cellPhone = users.mobile;
							if(users.address.indexOf(",")!=-1){
								_self.cityPickerValueDefault1 = users.address.split(",");
							}
							_self.cityText1 = users.remarks;
							if(users.nation != null && users.nation !=""){				
								_self.nationIndex = users.nation;
							}
							_self.location = users.userAddress;
							_self.mobile = users.mobile;
							_self.email = users.email;
							_self.emergency = users.userLationMobile;
						}
					}
				);
			},
			
			saveUsersBase:function(e){
				console.log("==="+_self.autofill)
				_self.$qyc.request(
					"/f/wx/wxUser/saveUsersBase", {
						id:_self.userid,
						openid: uni.getStorageSync('openid'),
						address:_self.cityPickerValueDefault1,
						nation:_self.nationIndex,
						userAddress:_self.location,
						email:_self.email,
						userLationMobile:_self.emergency,	
						remarks :_self.cityText1,
					},
					function(res) {
						uni.showToast({							
							title: res.message,
							duration: 2000,
							icon: 'none'
						});
						if(res.result){
							setTimeout(function()  {
								uni.navigateTo({
									url: '/pages/my/my'
								});							 
							}, 2000);
							
						}
					}
				);			
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.basic-head{height:80upx;font-weight:bold; line-height: 80upx;font-size: 32upx;color: #000000;padding-left:30upx;}
	.basicInfo{background:#fff;padding:20upx 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.basicInfo>view{line-height: 52upx;display: flex;}
	.basicInfo-title{opacity: 0.5;font-size: 28upx;color: #000000;margin-right:8upx;}
	.basicInfo-text{opacity: 0.8;font-size: 28upx;color: #000000;flex: 1;}
	.common{background:#fff;padding:0 30upx;padding-bottom:30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.common .grace-items{padding:0;}
	.common .grace-items .grace-label{opacity: 0.5;font-size:28upx;color: #000000;width:200upx;}
	.grace-form-r{line-height: 100upx;padding:0;}
	.hint{font-size:24upx;color: #F0474A;text-align: justify;line-height:52upx;}
	button{background:#3691B7;color:#fff;}
	button:active{background:#3691B7;color:#fff;}
	
</style>
