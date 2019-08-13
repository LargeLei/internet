<template>
	<view class="grace-padding">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="common">
					<view class="grace-items">
						<view class="grace-label">更换手机号</view>
						<input type="text" class="input" v-model="location" name="location" placeholder="请输入收件地址"></input>
					</view>
				</view>

				<view style="padding:40upx 0;">
					<button formType="submit" @tap="saveUsersBase" type="" style="width:96%;">确定更改</button>
				</view>
			</form>
		</view>
		
	</view>
</template>
<script>
	var _self;
	export default {

		onLoad: function(option) {
			_self = this;
		},
		data() {
			return {
				//基本信息
				username: "",
				gender: '',
				birth: "",
			
			}
		},
		methods: {
			
			

			saveUsersBase: function(e) {
			
				if (_self.emergencyMobile == '' || _self.emergencyMobile == undefined || !/^1[3456789]\d{9}$/.test(_self.emergencyMobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号！'
					});
					return;
				}
				let data = {
					id: _self.userid,
					openid: uni.getStorageSync('openid'),
				}
				console.log(data)
				uni.showLoading({
					title: '正在提交...'
				});
				// _self.$qyc.request(
				// 	"/f/wx/wxUser/saveUsersBase", data,
				// 	function(res) {
				// 		uni.hideLoading();
				// 		console.log(res)
				// 		uni.showToast({							
				// 			title: '保存成功！',
				// 			duration: 2000,
				// 			icon: 'none'
				// 		});
				// 		if(res.data){
				// 			setTimeout(function()  {
				// 				uni.navigateTo({
				// 					url: '/pages/my/my'
				// 				});							 
				// 			}, 2000);
				// 		}
				// 	}
				// );			
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	page {
		background: #F8F9FC;
	}

	.grace-padding {
		padding: 0;
		width: 100%;
	}
	.common {
		background: #fff;
		padding: 0 30upx;
		padding-bottom: 30upx;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.common .grace-items {
		padding: 0;
	}

	.common .grace-items .grace-label {
		opacity: 0.5;
		font-size: 28upx;
		color: #000000;
		width: 200upx;
	}

	.grace-form-r {
		line-height: 100upx;
		padding: 0;
	}

	.hint {
		font-size: 24upx;
		color: #F0474A;
		text-align: justify;
		line-height: 52upx;
	}

	button {
		background: #3691B7;
		color: #fff;
	}

	button:active {
		background: #3691B7;
		color: #fff;
	}
</style>
