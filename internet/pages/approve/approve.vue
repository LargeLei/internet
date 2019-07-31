<template>
	<view class="grace-padding">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="approve">
					<view style="padding:20upx 0;border-bottom:2upx solid rgba(214,214,214,0.50);">
						<view class="approve-head">身份证信息</view>
						<view class="approve-title">信息将与当前微信绑定（用于身份验证）</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">姓名</view>
						<input type="text" class="input" v-model="username" placeholder="请输入真实姓名" :value="username"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">身份证</view>
						<input type="text" class="input" v-model="idCard" placeholder="请输入身份证号码" :value="idCard"></input>
					</view>
				</view>
				<view class="approve">
					<view style="padding:20upx 0;border-bottom:2upx solid rgba(214,214,214,0.50);">
						<view class="approve-head">绑定/验证手机号码</view>
						<view class="approve-title">信息将与当前微信绑定（用于身份验证）</view>
					</view>
					<view class="grace-items">
						<input type="tel" class="input" v-model="mobile" name="mobile" placeholder="" style="margin:0;text-align: left;"></input>
						<view class="gain" @tap="sendMessage()">获取验证码</view>
					</view>
					<view class="grace-items grace-noborder">
						<input type="text" class="input" v-model="code" name="code" placeholder="请输入验证码" style="margin:0;text-align: left;"></input>
					</view>
				</view>
				<view style="padding:40upx 0;">
					<button formType="submit" type="" style="width:96%;" @tap="addApprove">确认</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		
		onLoad:function(option) {
			_self = this;
			this.getPhoneNumber();
		},
		data() {
			return {
				//身份证信息
				username:"雷清云",
				idCard: '610527199106215651',
				//绑定/验证手机号码
				mobile:'17348697420',
				code:'',
				cretKey:''
			}
		},
		methods: {
			getPhoneNumber: function(e) {  
                console.log(e);   
            }, 	
			sendMessage: function(e) {
				if (_self.mobile.length == 11) {
					_self.$qyc.request(
						"/f/wx/wxUser/sendMessage", {
							mobile: _self.mobile
						},
						function(res) {					
							_self.code = res.data;
							uni.showToast({							
								title: "发送成功",
								duration: 2000,
								icon: 'none'
							});
						}
					);
				}else{
					uni.showToast({
						type: 'warning',
						title: "输入正确手机号码",
						duration: 2000,
						icon: 'none'
					});
				}
			
			},
			addApprove: function(e) {
				if (_self.mobile.length == 11) {
					uni.showLoading({
						title: '正在提交...'
					});
					_self.$qyc.request(
						"/f/wx/wxUser/addApprove", {
							username: _self.username,
							mobile: _self.mobile,
							openid: uni.getStorageSync('openid'),
							idCard: _self.idCard,
							code:_self.code
						},
						function(res) {
							console.log(res)
							if(res.result){
								//_self.cretKey = obj.openid;
								//uni.setStorageSync('openid', _self.cretKey);
								uni.showToast({							
									title: "认证成功",
									duration: 2000,
									icon: 'none'
								});
								// setTimeout(function()  {
								// 	uni.navigateTo({
								// 		url: '/pages/my/my'
								// 	});							 
								// }, 2000);
							}else{
								uni.showToast({
									type: 'warning',
									title: res.message,
									duration: 2000,
									icon: 'none'
								});
							}
						}
					);
				}else{
					uni.showToast({
						type: 'warning',
						title: "输入正确手机号码",
						duration: 2000,
						icon: 'none'
					});
				}
			
			},
		}
		
	}
</script>

<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.approve{background:#fff;padding:0 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);margin-top:20upx;}
	.approve-head{font-weight:bold;font-size: 40upx;color: #000000;line-height: 65upx;margin-top:20upx;}
	.approve-title{opacity: 0.5;font-size: 24upx;color: #000000;line-height: 52upx;margin-bottom:20upx;}
	.approve{background:#fff;padding:0 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.approve .grace-items{padding:0;}
	.approve .grace-items .grace-label{opacity: 0.8;font-size:28upx;color: #000000;width:200upx;}
	.approve .grace-form-r{line-height: 100upx;padding:0;}
	.grace-form picker{height:100upx;line-height: 100upx;}
	.hint{font-size:24upx;color: #F0474A;text-align: justify;line-height:52upx;}
	.gain{font-size: 28px;color: #3691B7;line-height:100upx;text-align: right;width:60%;}
	button{background:#3691B7;color:#fff;}
	button:active{background:#3691B7;color:#fff;}
</style>
