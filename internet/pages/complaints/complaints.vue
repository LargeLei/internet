<template>
	<view class="grace-padding">
		<view class="plaints">
			<view class="plaints-head">投诉举报须知</view>
			<view class="plaints-detail" :data="infors">
				<view class="plaints-title">一、投诉举报受理范围</view>
				<view class="plaints-text">{{infors.area}}</view>
				<view class="plaints-title">二、不予受理条件</view>
				<view class="plaints-text" v-for="(item,index) in infors.term" :key="index">{{index+1}}.{{item.text}}</view>
				<view class="plaints-title">三、注意事项</view>
				<view class="plaints-text" v-for="(item,index) in infors.matter" :key="index">{{item.text}}</view>
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
				totalTime: 1,
				infors:{
					area:"国家“互联网+监管”投诉举报系统接收社会公众关于政府监管事项清单所有涉及的监管对象的投诉举报，实现互联网在线投诉举报登记和结果反馈。投诉：应是对涉及自身、伤害自身利益的行为进行举证投诉，应包含明确的投诉对象、投诉内容等，请点击“我要投诉”提交信息。举报：应对反映监管对象涉嫌违法违规线索的行为举证举报，可匿名举报，请点击“我要举报”提交信息",
				term:[
					{
						text:"无具体明确的被投诉举报对象和违法违规行为的；"
					},
					{
						text:"投诉举报已经受理且仍在调查处理过程中，投诉举报人就同一事项重复投诉举报的；"
					},
					{
						text:"投诉举报已依法处理，投诉举报人在无新线索的情况下以同一事实或者理由重复投诉举报的；"
					},
					{
						text:"违法行为已经超过法定追诉时限的；"
					},
					{
						text:"应当通过诉讼、仲裁、行政复议等法定途径解决或者已经进入上述程序的；"
					},
					{
						text:"其他依法不应当受理的情形；"
					},
					{
						text:"以投诉举报的形式进行咨询、政府信息公开申请、行政复议、信访、纪检监察检举控告、公职人员履职行为问题、政务服务投诉与建议等活动的，不适用本监管投诉举报业务范围。"
					}
				],
				matter:[
					{
						text:'（一）投诉举报人应当提供客观真实的投诉举报材料及证据，说明事情的基本经过，提供被投诉举报对象信息，涉嫌违法违规的具体行为，举证相关佐证说明、照片截图等详细信息。'
					},
					{
						text:'（二）提倡实名投诉举报。请您保持电话畅通，以便承办部门及时准确的与您联系，核实相关信息，并反馈办理结果。'
					},
					{
						text:'（三）投诉举报人应据实进行投诉举报，不得捏造事实、制造假证、诬告陷害他人，应对投诉举报信息的客观性、真实性负责。'
					},
					{
						text:'（四）举报主体提供的举报材料、举报要件将分发转交至相关主管部门，将对用户信息隐私信息保证安全不泄露。'
					},
					{
						text:'（五）并非全部投诉举报信息都会获得受理处置，敬请谅解。'
					},
					{
						text:'（六）如果还没有解决，建议走法律程序。'
					}
				]
				}
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
