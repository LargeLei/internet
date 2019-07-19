<template>
	<view class="grace-padding">
		<view class="plaints">
			<view class="plaints-head">投诉举报须知</view>
			<view class="plaints-detail">
				<view class="plaints-title">一、投诉举报受理范围</view>
				<view class="plaints-text">"明确写明监管对象范围、什么样的行为"限于境内监管对象。根据《XXXXXX》《XXXXXX》的规定。</view>
				<view class="plaints-title">二、受理和不予受理条件</view>
				<view class="plaints-text">"明确写明监管对象范围、什么样的行为"限于境内监管对象。根据《XXXXXX》《XXXXXX》的规定。</view>
				<view class="plaints-text">（一）投诉举报符合下列条件的，应予受理：</view>
				<view class="plaints-text">1.有具体明确的被投诉举报对象和违法行为；</view>
				<view class="plaints-text">2.被投诉举报对象及违法行为在本部门受理范围内。</view>
				<view class="plaints-text">（二）投诉举报具有下列情形之一的，不予受理：</view>
				<view class="plaints-text">1.无具体明确的被投诉举报对象和违法行为的；</view>
				<view class="plaints-text">2.被投诉举报对象及违法行为均不在本食品药品投诉举报机构或者管理部门管辖范围的；</view>
				<view class="plaints-text">3.不属于""管理部门监管职责范围的；</view>
				<view class="plaints-text">4.投诉举报已经受理且仍在调查处理过程中，投诉举报人就同一事项重复投诉举报的；</view>
				<view class="plaints-text">5.投诉举报已依法处理，投诉举报人在无新线索的情况下以同一事实或者理由重复投诉举报的；</view>
				<view class="plaints-text">6.违法行为已经超过法定追诉时限的；</view>
				<view class="plaints-text">7.应当通过诉讼、仲裁、行政复议等法定途径解决或者已经进入上述程序的；</view>
				<view class="plaints-text">8.其他依法不应当受理的情形。</view>
			</view>
			<view class="plaints-check">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox value="1" color="#3691B7" style="transform:scale(0.7);vertical-align:text-bottom;"></checkbox>
						我已阅读并同意《投诉须知》
					</label>
				</checkbox-group>
			</view>
			<view :class="'plaints-btn '+ bgClass+''" @tap="goComplaintsSearch">{{totalTime}}</view>
		</view>
	</view>
</template>
<script>
	var _self;
	var click_flag = false;
	export default {
		data() {
			return {
				bgClass: '', // 添加
				totalTime: 1
			}
		},
		onLoad() {
			_self = this;
			this.countDown();
		},
		methods: {
			countDown: function() {
				this.content = this.totalTime + 's';
				let clock = setInterval(function() {
					_self.totalTime--
					_self.content = _self.totalTime + 's'
					if (_self.totalTime < 1) {
						clearInterval(clock)
						_self.totalTime = '同意';
						// _self.bgClass = 'bgblue';
					}

				}, 1000);
			},
			goComplaintsSearch: function() {
				if (click_flag) {
					uni.navigateTo({
						url: '/pages/complaintSearch/complaintSearch'
					});
				}

			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				if (values[0] == 1 && _self.totalTime == '同意') {
					_self.bgClass = 'bgblue';
					click_flag = true;
				} else {
					_self.bgClass = '';
					click_flag = false;
				}

			}
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

	.plaints {
		background: #fff;
		padding: 20upx 30upx;
		margin-top: 20upx;
	}

	.plaints-head {
		opacity: 0.9;
		font-weight: bold;
		font-size: 32upx;
		color: #000000;
		text-align: center;
		line-height: 60upx;
	}

	.plaints-title {
		opacity: 0.8;
		font-weight: bold;
		font-size: 30upx;
		color: #000000;
		letter-spacing: 0;
		text-align: justify;
		line-height: 60upx;
	}

	.plaints-text {
		opacity: 0.7;
		font-size: 28upx;
		color: #000000;
		text-align: justify;
		line-height: 60upx;
	}

	.plaints-check label {
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#3691B7;
		font-size: 24upx;
	}

	.plaints-btn {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		margin-top: 10upx;
		color: #fff;
	}

	.plaints-btn.bgblue {
		background: #3691B7;
	}
</style>
