<template>
	<view class="grace-padding">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="common">
					<view class="grace-items">
						<view class="grace-label">更换手机号</view>
						<input type="text" class="input" v-model="mobile1" name="location" :placeholder="mobile"></input>
					</view>
				</view>
				<view style="padding:40upx 0;">
					<button formType="submit" @tap="changeTel" type="" style="width:96%;">确定更改</button>
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
			console.log(option)
			_self.id = option.id;
			_self.mobile = option.mobile;
			_self.truename = option.truename;
			_self.idCard = option.idCard;
		},
		data() {
			return {
				//基本信息
				id:'',
				truename: "",
				mobile: '',
				mobile1:'',
				idCard: ""
			}
		},
		methods: {
			changeTel: function(e) {
				if (_self.mobile1 == '' || _self.mobile1 == undefined || !/^1[3456789]\d{9}$/.test(_self.mobile1)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号！'
					});
					return;
				}
				let data = {
					id:_self.id,
					mobile: _self.mobile1,
					idCard: _self.idCard,
					trueName: _self.truename,
				}
				console.log(data)
				uni.showLoading({
					title: '正在提交...'
				});
				_self.$qyc.request(
					"/f/wx/wxUser/updateMobile", data,
					function(res) {
						uni.hideLoading();
						console.log(res)
							uni.showToast({							
								title: '保存成功！',
								duration: 2000,
								icon: 'none'
							});
							setTimeout(function()  {
								uni.redirectTo({
									url: '/pages/personalInfo/personalInfo'
								});							 
							}, 2000);
					}
				);			
			}
		},
	
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
		margin: 20upx 0;
		box-shadow: 0 1px 0 0 rgba(214, 214, 214, 0.50), 0 2px 14px 0 rgba(9, 63, 127, 0.05);
	}

	.common .grace-items {
		padding: 0;
		border: none;
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
