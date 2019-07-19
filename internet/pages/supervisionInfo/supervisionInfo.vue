<template>
	<view class="grace-padding">
		<view class="basic-head">企业基本信息</view>
		<view class="basicInfo">
			<view><text class="basicInfo-title">企业名称：</text><text class="basicInfo-text">{{epName}}</text></view>
			<view><text class="basicInfo-title">注册号：</text><text class="basicInfo-text">{{epRegistrationId}}</text></view>
			<view><text class="basicInfo-title">统一社会信用代码：</text><text class="basicInfo-text">{{epCode}}</text></view>
			<view><text class="basicInfo-title">企业类型：</text><text class="basicInfo-text">{{epType}}</text></view>
			<view><text class="basicInfo-title">企业类型（中文名称）：</text><text class="basicInfo-text">{{epTypeChain}}</text></view>
			<view><text class="basicInfo-title">登记机关：</text><text class="basicInfo-text">{{epAuthority}}</text></view>
			<view><text class="basicInfo-title">法定代表人：</text><text class="basicInfo-text">{{epDelegate}}</text></view>
			<view><text class="basicInfo-title">住所：</text><text class="basicInfo-text">{{epHouse}}</text></view>
			<view><text class="basicInfo-title">营业场所：</text><text class="basicInfo-text">{{epBusiness}}</text></view>
			<view><text class="basicInfo-title">经营范围：</text><text class="basicInfo-text">{{epScope}}</text></view>
			<view><text class="basicInfo-title">经营范围类型：</text><text class="basicInfo-text">{{epScopeType}}</text></view>
			<view><text class="basicInfo-title">经营范围类型（中文名称）：</text><text class="basicInfo-text">{{epScopeTypeChain}}</text></view>
			<view><text class="basicInfo-title">登记状态：</text><text class="basicInfo-text">{{epStatus}}</text></view>
			<view><text class="basicInfo-title">登记状态(中文名称）：</text><text class="basicInfo-text">{{epStatusChain}}</text></view>
		</view>
		<view class="basic-head">行政检查行为</view>
		<view class="basicInfo">
			<view><text class="basicInfo-title">检查行为名称：</text><text class="basicInfo-text">{{atName}}</text></view>
			<view><text class="basicInfo-title">实施机构：</text><text class="basicInfo-text">{{atEnforcement}}</text></view>
			<view><text class="basicInfo-title">受委托部门：</text><text class="basicInfo-text">{{atEntrusted}}</text></view>
			<view><text class="basicInfo-title">监管对象：</text><text class="basicInfo-text">{{atObject}}</text></view>
			<view><text class="basicInfo-title">行政相对人（单位/个人）：</text><text class="basicInfo-text">{{atCounterpart}}</text></view>
			<view><text class="basicInfo-title">检查形式：</text><text class="basicInfo-text">{{atFormation}}</text></view>
			<view><text class="basicInfo-title">检查类别：</text><text class="basicInfo-text">{{atType}}</text></view>
			<view><text class="basicInfo-title">检查方式：</text><text class="basicInfo-text">{{atMode}}</text></view>
			<view><text class="basicInfo-title">检查时间：</text><text class="basicInfo-text">{{atTime}}</text></view>
			<view><text class="basicInfo-title">检查结果：</text><text class="basicInfo-text">{{atResult}}</text></view>
		</view>
		<view class="basic-head">行政处罚行为</view>
		<view class="basicInfo">
			<view><text class="basicInfo-title">处罚行为名称：</text><text class="basicInfo-text">{{atName}}</text></view>
			<view><text class="basicInfo-title">实施机构：</text><text class="basicInfo-text">{{atEnforcement}}</text></view>
			<view><text class="basicInfo-title">受委托部门：</text><text class="basicInfo-text">{{atEntrusted}}</text></view>
			<view><text class="basicInfo-title">监管对象：</text><text class="basicInfo-text">{{atObject}}</text></view>
			<view><text class="basicInfo-title">行政相对人（单位/个人）：</text><text class="basicInfo-text">{{atCounterpart}}</text></view>
			<view><text class="basicInfo-title">违法事实：</text><text class="basicInfo-text">{{atFormation}}</text></view>
			<view><text class="basicInfo-title">作出行政处罚决定日期：</text><text class="basicInfo-text">{{atTime}}</text></view>
			<view><text class="basicInfo-title">处罚种类：</text><text class="basicInfo-text">{{atType}}</text></view>
			<view><text class="basicInfo-title">处罚结果：</text><text class="basicInfo-text">{{atResult}}</text></view>
		</view>
		<view class="basic-head">行政强制行为</view>
		<view class="basicInfo">
			<view><text class="basicInfo-title">行政强制种类：</text><text class="basicInfo-text">{{atName}}</text></view>
			<view><text class="basicInfo-title">强制措施类型：</text><text class="basicInfo-text">{{atEnforcement}}</text></view>
			<view><text class="basicInfo-title">强制执行类型：</text><text class="basicInfo-text">{{atEntrusted}}</text></view>
			<view><text class="basicInfo-title">强制结果：</text><text class="basicInfo-text">{{atObject}}</text></view>
			<view><text class="basicInfo-title">实施强制措施日期：</text><text class="basicInfo-text">{{atTime}}</text></view>
			<view><text class="basicInfo-title">强制措施延长期限：</text><text class="basicInfo-text">无</text></view>
			<view><text class="basicInfo-title">实施强制措施的结束时间：</text><text class="basicInfo-text">{{atTime}}</text></view>
		</view>
		<view class="basic-head">其他行为</view>
		<view class="basicInfo">
			<view><text class="basicInfo-title">行为名称：</text><text class="basicInfo-text">{{atName}}</text></view>
			<view><text class="basicInfo-title">监管对象：</text><text class="basicInfo-text">{{atEnforcement}}</text></view>
			<view><text class="basicInfo-title">实施机构：</text><text class="basicInfo-text">{{atEntrusted}}</text></view>
			<view><text class="basicInfo-title">受委托部门：</text><text class="basicInfo-text">{{atObject}}</text></view>
			<view><text class="basicInfo-title">行政相对人（单位/个人）：</text><text class="basicInfo-text">{{atCounterpart}}</text></view>
			<view><text class="basicInfo-title">监管措施：</text><text class="basicInfo-text">无</text></view>
			<view><text class="basicInfo-title">开始时间：</text><text class="basicInfo-text">{{atTime}}</text></view>
			<view><text class="basicInfo-title">结束时间：</text><text class="basicInfo-text">{{atTime}}</text></view>

		</view>
	</view>
</template>
<script>
	var _self;
	var id;
	export default {
		onLoad: function(option) {
			_self = this;
			id = option.id;
			this.getComponyInfo();
		},
		data() {
			return {
				//企业基本信息
				epName:'',
				epRegistrationId:'510100400024413',
				epCode:'',
				epType:'',
				epTypeChain:'有限责任公司(自然人独资)',
				epAuthority:'连江县市场监督管理局',
				epDelegate:'苏大强',
				epHouse:'连江县凤城镇莲荷东路百凤花园连结体1XXXX ',
				epBusiness:'北京市西城区',
				epScope:'酒类销售；服装、鞋帽、手   表、日用品、办公用品、电子产品、五金产品批发、零售',
				epScopeType:'WATCH',
				epScopeTypeChain:'表',
				epStatus:'YDJ',
				epStatusChain:'已登记',
				//行政检查行为
				atName:'北京市XX科技',
				atEnforcement:'XXXX机构',
				atEntrusted:'2013年02月13日',
				atObject:'连江县市场监督管理局',
				atCounterpart:'张小多',
				atFormation:'XXXX检查',
				atType:'服装类',
				atMode:'XXXXXXXXXXX检查',
				atTime:'2013年02月13日',
				atResult:'良好'
			}
		},
		onReady: function() {

		},
		methods: {
			getComponyInfo:function(){
				_self.$qyc.request(
					"/f/mp/mplogin/getShopinfoById", {
						id:id
					},
					function(res) {
						console.log(JSON.stringify(res));
						_self.epName = res.data.shopName;
						_self.epCode = res.data.shopId;
						_self.epClass = res.data.shopClass;
						_self.epType = res.data.shopType;
						_self.epHouse = res.data.shopAddress;
						_self.epOffice = res.data.shopContent;
						_self.epRange = res.data.remarks;
					}
				);
			},
		}
	}
</script>
<style>
	page{background: #F8F9FC;}
	.grace-padding{padding:0;width: 100%;}
	.basic-head{height:80upx;font-weight:bold; line-height: 80upx;font-size: 32upx;color: #000000;padding-left:30upx;}
	.basicInfo{background:#fff;padding:20upx 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.basicInfo>view{line-height: 52upx;display: flex;padding:4upx 0;}
	.basicInfo-title{opacity: 0.5;font-size: 28upx;color: #000000;margin-right:8upx;}
	.basicInfo-text{opacity: 0.8;font-size: 28upx;color: #000000;flex: 1;}
</style>
