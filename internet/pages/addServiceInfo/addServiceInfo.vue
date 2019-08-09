<template>
	<view class="grace-padding">
		<form @submit="formSubmit">

			<!-- 投诉举报对象切换 -->
			<radio-group @change="radioChange" class="cpl-rpt-choose-radio">
				<view>
					<label v-for="(item,index) in cplRpt" :key="item.value">
						<radio color="#3691B7" :value="item.type" :checked="index == cplRptCurrent" />{{item.label}}</label>
				</view>
			</radio-group>

			<view class="target">
				<view class="target-list grace-space-between">
					<view class="target-list-title">投诉人</view>
					<view class="target-list-text">{{userName}}</view>
				</view>
				<view class="target-list grace-space-between">
					<view class="target-list-title">身份证号</view>
					<view class="target-list-text">{{userCertificateNumber}}</view>
				</view>
				<view class="target-list grace-space-between">
					<view class="target-list-title" style="width:200upx;">联系地址</view>
					<input type="text" class="input" maxlength="100" style="width:100%;text-align: right;" v-model="userAddress"
					 placeholder="请输入联系地址(100字以内)"></input>
				</view>
			</view>
			<!-- 投诉对象 -->
			<view class="grace-form">
				<view class="target-info">
					<view class="grace-items">
						<view class="grace-label"><text>投诉对象</text><text class="col-red">*</text></view>
						<view class="input-right">{{complaintObject}}</view>
					</view>
					<!-- <view class="grace-items">  
						<view class="grace-label"><text>投诉对象住所</text><text class="col-red">*</text></view>
						<input type="text" class="input" v-model="complaintTerritory" placeholder="" readonly="true"></input>
					</view> -->
					<view class="grace-items">
						<view class="grace-label"><text>投诉问题类型</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="cptType.length > 0">
							<picker @change="bindTypeChange" :value="cptTypeIndex" range-key="problemType" :range="cptType">
								<text>{{cptType[cptTypeIndex].problemType}}</text>
							</picker>
						</view>
					</view>
				</view>
				<!-- 投诉属地 -->
				<view class="target-info">
					<view class="grace-items">
						<view class="grace-label"><text>举报属地(省)</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="province.length > 0">
							<picker @change="provinceChange" :value="provinceIndex" range-key="cityName" :range="province" name="cityCode">
								<text>{{province[provinceIndex].cityName}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text>举报属地(市)</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="city.length > 0">
							<picker @change="cityChange" :value="cityIndex" range-key="cityName" :range="city" name="cityCode">
								<text>{{city[cityIndex].cityName}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text>举报属地(区)</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="district.length > 0">
							<picker @change="districtChange" :value="districtIndex" range-key="cityName" :range="district" name="cityCode">
								<text>{{district[districtIndex].cityName}}</text>
							</picker>
						</view>
					</view>
				</view>

				<!-- 发生地点-->
				<!-- 非必填 -->
				<view class="target-info" v-show="safeShow1">
					<view class="grace-items">
						<view class="grace-label"><text>发生地点</text></view>
						<input type="text" maxlength="200" class="input" v-model="place1" placeholder="请输入发生地点(200字以内)"></input>
					</view>
				</view>
				<!-- 必填 -->
				<view class="target-info" v-show="safeShow">
					<view class="grace-items">
						<view class="grace-label"><text>发生地点</text><text class="col-red">*</text></view>
						<input type="text" maxlength="200" class="input" v-model="place" placeholder="请输入发生地点(200字以内)"></input>
					</view>
				</view>
				<!-- 金融监管-->
				<view class="target-info" v-show="regulationShow">
					<view class="grace-items grace-noborder">
						<view class="grace-label"><text>涉案金额</text><text class="col-red">*</text></view>
						<input type="text" class="input" v-model="regulationMoney" placeholder="请输入涉案金额"></input>
					</view>
				</view>

				<!-- 市场监管-->
				<view class="target-info" v-show="marketShow">
					<view class="grace-items">
						<view class="grace-label"><text>商品/服务类型</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="serveType.length > 0">
							<picker @change="bindServeTypeChange" :value="serveTypeIndex" range-key="serviceCame" :range="serveType">
								<text>{{serveType[serveTypeIndex].serviceCame}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text>二级分类</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="classifyOne.length > 0">
							<picker @change="bindOneChange" :value="classifyOneIndex" range-key="serviceCame" :range="classifyOne">
								<text>{{classifyOne[classifyOneIndex].serviceCame}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text>三级分类</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="classifyTwo.length > 0">
							<picker @change="bindTwoChange" :value="classifyTwoIndex" range-key="serviceCame" :range="classifyTwo" name="classifyTwo">
								<text>{{classifyTwo[classifyTwoIndex].serviceCame}}</text>
							</picker>
						</view>
					</view>

					<view class="grace-items">
						<view class="grace-label"><text>商品/服务名称</text><text class="col-red">*</text></view>
						<input type="text" class="input" v-model="serveName" placeholder="请输入商品服务名称"></input>
					</view>

					<view class="grace-items">
						<view class="grace-label"><text>品牌</text></view>
						<input type="text" class="input" v-model="brand" placeholder="请输入品牌名称"></input>
					</view>
					<view v-if="cplRptCurrent != 1">
						<view class="grace-items">
							<view class="grace-label"><text>购物方式</text><text class="col-red">*</text></view>
							<view class="grace-form-r" v-if="pattern.length > 0">
								<picker @change="bindPatternChange" :value="patternIndex" range-key="shoppingType" :range="pattern" name="pattern">
									<text>{{pattern[patternIndex].shoppingType}}</text>
								</picker>
							</view>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>订单号</text></view>
							<input type="text" class="input" v-model="orderNum" placeholder="请输入订单号"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>型号规格</text><text class="col-red">*</text></view>
							<input type="text" class="input" v-model="specification" placeholder="请输入型号规格"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>数量</text></view>
							<input type="text" class="input" v-model="count" placeholder="请输入数量"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>计量单位</text></view>
							<view class="grace-form-r" v-if="unit.length > 0">
								<picker @change="bindUnitChange" :value="unitIndex" range-key="unitType" :range="unit" v-model="unit">
									<text>{{unit[unitIndex].unitType}}</text>
								</picker>
							</view>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>消费金额</text></view>
							<input type="text" class="input" v-model="amount" placeholder="请输入消费金额"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label"><text>消费日期</text></view>
							<view class="grace-form-r">
								<picker @change="bindConsumedateChange" :value="consumedate" mode="date" end="today">
									<text>{{consumedate}}</text>
								</picker>
							</view>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label"><text>争议发生日期</text></view>
							<picker @change="bindDisputeDateChange" :value="disputeDate" mode="date" end="today">
								<text>{{disputeDate}}</text>
							</picker>
						</view>
					</view>
				</view>

				<!-- 生态环境-->
				<view class="target-info" v-show="organShow">
					<view class="grace-items">
						<view class="grace-label"><text>污染类型</text><text class="col-red">*</text></view>
						<view class="grace-form-r" v-if="pollution.length > 0">
							<picker @change="pollutionChange" :value="pollutionIndex" range-key="pollutionType" :range="pollution" name="pollutionCode">
								<text>{{pollution[pollutionIndex].pollutionType}}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>

			<!--公共部分 -->
			<view class="suggest">
				<view class="suggest-textarea">
					<view class="suggest-list">
						<text>投诉内容</text><text class="col-red">*</text>
					</view>
					<textarea maxlength="2000" placeholder-style="opacity: 0.3" v-model="complaintDetail" placeholder="投诉内容(2000字以内)" />
					</view>
			</view>
			<!-- 上传 -->
			<view class="upload">
				<view class="grace-wrap">
					<view class="grace-boxes" @tap="wakeupPhoto" >
						<view class="grace-boxes-img">
							<image src="../../static/imgs/tp_icon.png" mode="widthFix"></image>
						</view>
						<view class="grace-boxes-text">图片</view>
					</view>
					<view class="grace-boxes" @tap="wakeupVedio">
						<view class="grace-boxes-img">
							<image src="../../static/imgs/ssp_icon.png" mode="widthFix"></image>
						</view>
						<view class="grace-boxes-text">随手拍</view>
					</view>
					<!-- 录音弹出层 -->  
					<view class="grace-boxes" @tap="tapePop">
						<jsfun-record voicePath="" maxTime="15" minTime="5" @okClick="saveRecord">
							<view class="grace-boxes-img">
								<image src="../../static/imgs/yp_icon.png" mode="widthFix"></image>
							</view>
							<view class="grace-boxes-text">音频</view>
						</jsfun-record>
					</view>
					<!-- 弹出层成功 --> 
					
				</view>	
				<view class="grace-add-file">
					<view class="garce-items" v-for="(item, index) in imgLists" :key="index">
						<view class="file-box">
							<!-- 图片 -->
							<image :src="item.path" class="file-image" :data-imgurl="item.path" v-if="item.type==1"></image>
							<!-- 视频 -->
							<video :src="item.path" v-if="item.type==2"></video>
							<!-- 音频 -->
							<audio :src="item.path" v-if="item.type==3"></audio>
							<image src="../../static/imgs/bf_icon.png" class="file-bf" v-if="item.type == 2"></image>
							<image src="../../static/imgs/yy_icon.png" class="file-bf" v-if="item.type == 3"></image>
						</view>
						<image src="../../static/imgs/btn_delete_pic.png" mode="widthFix" class="file-close" @tap="removeImg" :id="'grace-items-img-'+index"></image>
					</view>
				</view>
			</view>
			<!-- 是否公开 -->
			<view class="grace-form">
				<view class="target-info">
					<view class="grace-items grace-noborder">
						<view class="grace-label"><text>是否公开</text><text class="col-red">*</text></view>
						<view class="grace-form-r">
							<picker @change="bindOpenChange" :value="openIndex" range-key="publicName" :range="open" name="open">
								<text>{{open[openIndex].publicName}}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>	
			<!-- 匿名举报 -->
			<view class="grace-form" v-if="cplRptCurrent == 1">
				<view class="target-info">
					<view class="grace-items grace-noborder">
						<view class="grace-label"><text>匿名举报</text><text class="col-red">*</text></view>
						<view class="grace-form-r">
							<picker @change="bindAnonymousChange" :value="anonymousIndex" range-key="anonymousName" :range="anonymous" name="anonymous">
								<text>{{anonymous[anonymousIndex].anonymousName}}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>	
			<view class="target-btn">
				<button @tap="goService">确定</button>
			</view>
		</form>
		<graceMaskView :show="successShow">
			<view class="pop-detail">
				<view v-if="cplRptCurrent != 1">
					<image src="../../static/imgs/cg_icon.png" mode="widthFix"></image>
					<view class="pop-title success">投诉信息成功提交!</view>
					<view class="pop-text">
						<text>您提交的投诉信息已录入</text>
						<text>系统，可在我的投诉举报信息中查看</text>
					</view>
				</view>
				<view v-else>
					<image src="../../static/imgs/cg_icon.png" mode="widthFix"></image>
					<view class="pop-title success">举报信息成功提交!</view>
					<view class="pop-text">
						<text>您提交的举报信息已录入</text>
						<text>系统，可在我的投诉举报信息中查看</text>
					</view>
				</view>
			</view>
		</graceMaskView>
		<!-- 弹出层失败 -->
		<graceMaskView :show="errorshow">
			<view class="pop-detail">
				<view v-if="cplRptCurrent != 1">
					<image src="../../static/imgs/sb_icon.png" mode="widthFix"></image>
					<view class="pop-title danger">投诉信息提交失败！</view>
					<view class="pop-text">
						<text>您有一条相同投诉正在办理中，请勿重复提交</text>
						<text class="danger">请勿多条重复、虚假投诉提交，请慎重对待投诉举报通道</text>
					</view>
				</view>
				<view v-else>
					<image src="../../static/imgs/sb_icon.png" mode="widthFix"></image>
					<view class="pop-title danger">举报信息提交失败！</view>
					<view class="pop-text">
						<text>您有一条相同举报正在办理中，请勿重复提交</text>
						<text class="danger">请勿多条重复、虚假举报提交，请慎重对待投诉举报通道</text>
					</view>
				</view>
			</view>
		</graceMaskView>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1" @onCancel="onCancel1" @onConfirm="onConfirm1"></mpvue-city-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../threeComponents/mpvuePicker.vue';
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	import jsfunRecord from '@/components/jsfun-record/jsfun-record.vue';
	var maxNum = 4;
	var _self;
	var id;
	var recorderManager = uni.getRecorderManager();
	export default {
		onLoad:function(option){
			_self = this;
			id = option.id;
			if(option.complaintObject == 'undefined' || option.complaintObject == undefined){
				this.getComponyInfo(option.complaintObject);
			}else{
				this.complaintObject = option.complaintObject;
			}
			this.getUserinfo();
			this.getPollutionList();
			this.getProblemTypeList();
			this.getServiceTypeList();
			this.getShoppingTypeList();
			this.getUnitTypeList();
			this.getProvinceList();
			
		},
		onShow:function(option){
			this.getUserinfo();
			this.getPollutionList();
			this.getProblemTypeList();
			this.getServiceTypeList();
			this.getShoppingTypeList();
			this.getUnitTypeList();
			this.getProvinceList();
		},
		data() {
			return {
				//投诉举报类型
				cplRpt:[
					{
						label:'投诉',
						type:0
					},
					{
						label:'举报',
						type:1
					},
				],
				cplRptCurrent:0,
				userName:'',
				userCertificateNumber:'',
				userAddress:'',
				//投诉对象
				complaintObject:'',
				complaintTerritory:'',
				cptTypeIndex: 0,
				cptType: [{'problemCode':'0','problemType':'请选择'}], //投诉问题类型
				themeColor: '#3691B7', //属地颜色

				//省市区
				province: [{'cityCode':'0','cityName':'请选择'}],
				provinceIndex:0,
				city: [{'cityCode':'0','cityName':'请选择'}],
				cityIndex:0,
				district : [{'cityCode':'0','cityName':'请选择'}],
				districtIndex:0,
				
				pollution :[{'pollutionCode':'0','pollutionType':'请选择'}],//污染类型
				pollutionIndex:0,
				//dom切换节点
				problemCode:'',				
								
				//商品服务类型模块
				serviceTypeList :[],
				serveTypeIndex: 0,
				serveType: [{'serviceCode':'0','serviceCame':'请选择'}],
				classifyVal:'00000000',
				classifyOneIndex:0,
				classifyOne:[{'serviceCode':'0','serviceCame':'请选择'}],
				classifyTwoIndex:0,
				classifyTwo:[{'serviceCode':'0','serviceCame':'请选择'}],
				serveName:'',
				//品牌内容
				brand:'',
				patternIndex:0,
				pattern:[],
				orderNum:'',
				specification:'',
				count:'',
				unitIndex:0,
				unit:[],
				amount:'', 
				today:new Date(),
				consumedate:'',
				disputeDate:'',
				//涉嫌金额
				regulationMoney:'',
				//上传
				imgLists : [],
				place1:'',
				place:'',
				complaintDetail:'',
				imgShow:false,
				tapeShow:false,
				
				//是否公开
				openIndex:0,
				open:[
					{'publicCode':'0','publicName':'公开'},
					{'publicCode':'1','publicName':'不公开'},
				],
				isPublic:0,
				//是否匿名
				anonymousIndex:0,
				anonymous:[
					{'anonymousCode':'0','anonymousName':'不匿名'},
					{'anonymousCode':'1','anonymousName':'匿名'}
				],
				isanonymous:0,
				//弹框
				searchKey: "",
				successShow : false,
				errorshow: false,
				//显示 隐藏
				safeShow1:false,
				safeShow:false,
				regulationShow:false,
				marketShow:false,
				organShow:false,
				certKey:''
			}
		},
		methods: {
			
			//投诉举报类型选择
			 radioChange: function(evt) {
				for (let i = 0; i < _self.cplRpt.length; i++) {
					if (_self.cplRpt[i].type == evt.target.value) {
						_self.cplRptCurrent = i;
						//console.log(_self.cplRptCurrent)
						break;
					}
				}
				if(_self.cplRptCurrent == 1){
					if(_self.problemCode == '03'){//生态环境
						this.safeShow1 = false;
					}else if(_self.problemCode == '11'){//安全生产
						this.safeShow1 = false;
					}else if(_self.problemCode == '12'){//金融监管
						this.safeShow1 = false;
					}else{
						this.safeShow1 = true;
					}
				}else{
					_self.safeShow1 = false
				}
			},
			
			saveRecord: function(recordPath) {	
				var numAudio = maxNum - _self.imgLists.length;
				if(numAudio < 1){
					uni.showToast({
						title: "超出上传数量！",
						duration: 2000,
						icon: 'none'
					});
					return false;
					}
				console.log("===音频文件地址："+recordPath+"===")
				var tempFiles = [
					{
						path:recordPath
					}
				];
				for (let i = 0; i < tempFiles.length; i++) {
					tempFiles[i]['upload_percent'] = 0
					tempFiles[i]['type'] = 3
					_self.imgLists = _self.imgLists.concat(tempFiles[i])
				}
				console.log(_self.imgLists)
				
			},
			getUserinfo:function(){
				_self.$qyc.request(
					"/f/wx/wxUser/getApproveStatus", {
						openid:uni.getStorageSync('openid')
					},
					function(res) {
						console.log(res)
						_self.userName = res.data.trueName;
						_self.userCertificateNumber = res.data.idcard;
						_self.certKey =res.data.certKey
					}
				);
			},
			getComponyInfo:function(){
				_self.$qyc.interfaceRequest(
					"/entInfo/findEntInformationById", {
						id:id
					},
					function(res) {
						_self.complaintObject = res.data.entName;
					}
				);
			},
			//获取污染类型 TODO
			getPollutionList:function(){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/admin/pollutiontype/getchildlistbyparentcode", {
						'parentCode':'0000'
					},
					function(res) {
						console.log(res)
						if(res.success){
							var a=[{'pollutionCode':'0','pollutionType':'请选择'}];
							_self.pollution = a.concat(res.data);
						}
					}
				);
			},
			
			//获取投诉问题类型
			getProblemTypeList:function(){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/admin/problemtype/getchildlistbyparentcode", {
						"parentCode":"0000"
					},
					function(res) {
						if(res.success){
							var a=[{'problemCode':'0','problemType':'请选择'}];
							_self.cptType = a.concat(res.data);
						}
					}
				);
			},
			//获取商品服务类型
			getServiceTypeList:function(){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/admin/servicetype/getchildlistbyparentcode", {
						"parentCode":"000000"
					},
					function(res) {
						if(res.success){
							_self.serviceTypeList = res.data;
							var a=[{'serviceCode':'0','serviceCame':'请选择'}];
							_self.serveType = a.concat(res.data);
						}
					}
				);
			},
			//获取购物方式类型
			getShoppingTypeList:function(){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/shoppingtype/getchildlistbyparentcode", {
						"parentCode":"0000"
					},
					function(res) {
						if(res.success){
							var a=[{'shoppingCode':'0','shoppingType':'请选择'}];
							_self.pattern = a.concat(res.data);
						}
					}
				);
			},
			//获取计量单位类型
			getUnitTypeList:function(){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/unittype/getchildlistbyparentcode", {
						"parentCode":"0000"
					},
					function(res) {
						if(res.success){
							var a=[{'unitCode':'0','unitType':'请选择'}];
							_self.unit = a.concat(res.data);
						}
					}
				);
			},
			//投诉问题类型    页面根据切换  TODO
			bindTypeChange: function(e) {
				this.cptTypeIndex = e.detail.value;
				_self.problemCode = this.cptType[this.cptTypeIndex].problemCode;
				if(_self.problemCode == '03'){//生态环境
					this.safeShow1 = false;
					this.safeShow = true;
					this.regulationShow = false;
					this.marketShow = false;
					this.organShow = true;
				}else if(_self.problemCode == '08'){//市场监管
					this.safeShow = false;
					this.regulationShow = false;
					this.marketShow = true;
					this.organShow = false;
				}else if(_self.problemCode == '11'){//安全生产
					this.safeShow1 = false;
					this.safeShow = true;
					this.regulationShow = false;
					this.marketShow = false;
					this.organShow = false;
				}else if(_self.problemCode == '12'){//金融监管
					this.safeShow = false;
					this.regulationShow = true;
					this.marketShow = false;
					this.organShow = false;
				}else{
					this.safeShow = false;
					this.regulationShow = false;
					this.marketShow = false;
					this.organShow = false;
				}
				
			},
			//消费时间
			bindConsumedateChange: function(e) {
				this.consumedate = e.detail.value;
			},
			//争议发生日期
			bindDisputeDateChange: function(e) {   
				this.disputeDate = e.detail.value;

			},
			//污染切换
			pollutionChange:function(e){
				console.log(e.detail.value)
				this.pollutionIndex = e.detail.value;
			},
			//城市选择
			// cityPicker1 : function(){
			// 	this.$refs.mpvueCityPicker1.show();
			// },
			onConfirm1(e) {
				var cityText1  = e.label;
				var cityValue1 = e.value;
				var cityCode1  = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			
			//省市区获取
			getProvinceList : function(e){
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/citycode/findcityinfobyparentcode", {
						parentCode: '000000'
					},
					function(res) {						
						var a=[{'cityCode':'0','cityName':'请选择'}];						
						_self.province = a.concat(res.data);				
					}
				);
			},			
			provinceChange :function(e){	
				_self.provinceIndex=e.detail.value;
				_self.complaintTerritory = _self.province[e.detail.value].cityName;
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/citycode/findcityinfobyparentcode", {
						parentCode: _self.province[e.detail.value].cityCode
					},
					function(res) {
						var a=[{'cityCode':'0','cityName':'请选择'}];
						_self.city = a.concat(res.data);
						_self.cityIndex = 0;
						_self.districtIndex = 0
					}
				);
			},
			cityChange :function(e){
				_self.cityIndex=e.detail.value;
				_self.complaintTerritory = _self.complaintTerritory+_self.city[e.detail.value].cityName;
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/citycode/findcityinfobyparentcode", {
						parentCode: _self.city[e.detail.value].cityCode
					},
					function(res) {
						var a=[{'cityCode':'0','cityName':'请选择'}];
						_self.district = a.concat(res.data);
						_self.districtIndex = 0
					}
				);
			},
			districtChange:function(e){
				_self.complaintTerritory = _self.complaintTerritory+_self.district[e.detail.value].cityName;
				_self.districtIndex=e.detail.value;
			},
			
			//商品服务类型模块
			bindServeTypeChange: function(e) {
				var val = _self.serveType[e.detail.value].serviceCode;
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/admin/servicetype/getchildlistbyparentcode", {
						"parentCode":val
					},
					function(res) {
						if(res.success){
							var b=[{'serviceCode':'0','serviceCame':'请选择'}];
							_self.classifyOne = b.concat(res.data);
							_self.serveTypeIndex = e.detail.value;
						}
					}
				);
			},
			bindOneChange: function(e) {
				var val = _self.classifyOne[e.detail.value].serviceCode;
				_self.$qyc.interfaceRequest(
					"/ebus/tsjb/admin/servicetype/getchildlistbyparentcode", {
						"parentCode":val
					},
					function(res) {
						if(res.success){
							var c=[{'serviceCode':'0','serviceCame':'请选择'}];
							_self.classifyTwo = c.concat(res.data);
							_self.classifyOneIndex = e.detail.value;
						}
					}
				);
				
			},
			bindTwoChange: function(e) {
				var val = _self.classifyTwo[e.detail.value].serviceCode;
				var fourArr = _self.serviceTypeList.filter(function (e) { 
					return e.parentCode == val; 
				});
				var d=[{'serviceCode':'0','serviceCame':'请选择'}];
				_self.classifyThree = d.concat(fourArr);
				_self.classifyTwoIndex = e.detail.value;
			},
			bindThreeChange: function(e) {
				console.log(e);
				_self.classifyThreeIndex = e.detail.value;
			},
			//品牌内容
			bindPatternChange: function(e) {
				console.log(e);
				this.patternIndex = e.detail.value;
			},
			bindUnitChange: function(e) {
				console.log(e);
				this.unitIndex = e.detail.value;
			},
			//是否公开
			bindOpenChange: function(e) {
				_self.isPublic = _self.open[e.detail.value].publicCode;
				this.openIndex = e.detail.value;
			},
			//是否匿名
			bindAnonymousChange: function(e) {
				_self.isanonymous = _self.anonymous[e.detail.value].anonymousCode;
				if(_self.isanonymous == 0){
					_self.userinfoShow = true;
				}else{
					_self.userinfoShow = false;
				}
				this.anonymousIndex = e.detail.value;
			},
			//调起手机相册
			wakeupPhoto : function(){
				var numImg = maxNum - _self.imgLists.length;
				if(numImg < 1){
					uni.showToast({
						title: "超出上传数量！",
						duration: 2000,
						icon: 'none'
					});
					return false;
					}
				uni.chooseImage({
					count: numImg,
					sizeType: ['compressed'],
					success: function(res) {
						console.log(res)
						var tempFiles = res.tempFiles
						for (let i = 0; i < tempFiles.length; i++) {
							tempFiles[i]['upload_percent'] = 0
							tempFiles[i]['type'] = 1
							_self.imgLists = _self.imgLists.concat(tempFiles[i])
						}
					},
					fail: function (res) {
						uni.hideLoading();
					} 
				});
			},
			//视频录制上传
			wakeupVedio : function(){
				var numVideo = maxNum - _self.imgLists.length;
				if(numVideo < 1){
					uni.showToast({
						title: "超出上传数量！",
						duration: 2000,
						icon: 'none'
					});
					return false;
					}
				uni.chooseVideo({
					count: numVideo,
					sourceType: ['camera', 'album'],
					success: function (res) {
						console.log(res)
						var tempFiles = res.tempFiles
						for (let i = 0; i < tempFiles.length; i++) {
							tempFiles[i]['upload_percent'] = 0
							tempFiles[i]['type'] = 2
							_self.imgLists = _self.imgLists.concat(tempFiles[i])
						}
						
					},
					fail: function (res) {
						uni.hideLoading();
					} 
				});
			},
			//音频录制上传
			tapePop:function(){
				this.tapeShow = true;
			},	
			//删除上传文件
			removeImg : function(e){
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imgLists.splice(index, 1);
				_self.imgLists = _self.imgLists;
			},	
			//提交
			goService : function(){
				var data = {
					"userName": _self.userName,
					"userCertificateNumber": _self.userCertificateNumber,
					"userAddress":_self.userAddress ,
					"proviceCode":_self.province[_self.provinceIndex].cityCode,
					"cityCode": _self.city[_self.cityIndex].cityCode,
					"districtCode": _self.district[_self.districtIndex].cityCode,
					"ispublic": _self.isPublic,
					"certKey":_self.certKey
				};
				if(_self.cptTypeIndex == 0){
					uni.showToast({
						icon: 'none',
						title: '请选择投诉问题类型！'
					});
					return;
				}
				if(_self.provinceIndex == 0){
					uni.showToast({
						icon: 'none',
						title: '请选择投诉属地省份！'
					});
					return;
				}
				if(_self.cityIndex == 0){
					uni.showToast({
						icon: 'none',
						title: '请选择投诉属地城市！'
					});
					return;
				}
				if(_self.districtIndex == 0){
					uni.showToast({
						icon: 'none',
						title: '请选择投诉属地区域！'
					});
					return;
				}
				if(_self.problemCode == '03'){
					if(_self.place == ""){
						uni.showToast({
							icon: 'none',
							title: '请输入发生地点！'
						});
						return;
					}
					if(_self.pollution[_self.pollutionIndex].pollutionCode == "0"){
						uni.showToast({
							icon: 'none',
							title: '请选择污染类型！'
						});
						return;
					}
					data.pollutionType = _self.pollution[_self.pollutionIndex].pollutionCode;
					data.occurplace = _self.place;
				}
				if(_self.problemCode == '11'){
					if(_self.place == ""){
						uni.showToast({
							icon: 'none',
							title: '请输入发生地点！'
						});
						return;
					}
					data.occurplace = _self.place;
				}
				
				if(_self.cplRptCurrent == 1){
					data.reportObject = _self.complaintObject;
					data.reportType = _self.cptType[_self.cptTypeIndex].problemCode;
					data.reportTerritory = _self.complaintTerritory;
					data.occurplace = _self.place1;
					data.reportDetail = _self.complaintDetail;
					data.isanonymous = _self.isanonymous;
					if(_self.problemCode == '08'){
						if(_self.classifyTwo[_self.classifyTwoIndex].serviceCode == "0"){
							uni.showToast({
								icon: 'none',
								title: '请选择商品服务类型！'
							});
							return;
						}
						if(this.serveName == ""){
							uni.showToast({
								icon: 'none',
								title: '请填写商品服务名称！'
							});
							return;
						}
						data.serviceType = _self.classifyTwo[_self.classifyTwoIndex].serviceCode;
						data.serviceName = _self.serveName;
						data.brand = _self.brand;
					}
					if(this.complaintDetail == ""){
						uni.showToast({
							icon: 'none',
							title: '请填写投诉内容！'
						});
						return;
					}
					if(_self.imgLists.length != 0){
						for (let i = 0; i < _self.imgLists.length; i++) {
							if ( _self.imgLists[i]['upload_percent'] == 0) {
								 _self.$qyc.fileRequest(
									"/ebus/tsjb/complaints/upload",
									  _self.imgLists[i].path,
									  'file',
									function(res) {
										if(i>=_self.imgLists.length-1){
											console.log(i)
											uni.showLoading({
												title: '正在提交...'
											});
											console.log(data)
											_self.$qyc.interfaceRequest(
												"/ebus/tsjb/reportinformation/addreportinformation", data,
												function(res) {
													//console.log(res)
													if(res.success){
														_self.successShow = true;
														setTimeout(function(){
															uni.navigateTo({ 
																url: '/pages/myComplaint/myComplaint?certKey='+_self.certKey
															});
															var obj = _self.$options.data();
															obj.reportObject = _self.reportObject;
															Object.assign(_self.$data, obj);
														},2000);
													}
												}
											);
										}
									}
								 );
							   }
						}
					}
					
				}else{
					data.complaintObject = _self.complaintObject ;
					data.complaintTerritory = _self.complaintTerritory;
					data.complaintType = _self.cptType[_self.cptTypeIndex].problemCode;
					data.complaintDetail = _self.complaintDetail;
					if(_self.problemCode == '08'){
						if(_self.classifyTwo[_self.classifyTwoIndex].serviceCode == "0"){
							uni.showToast({
								icon: 'none',
								title: '请选择商品服务类型！'
							});
							return;
						}
						if(this.serveName == ""){
							uni.showToast({
								icon: 'none',
								title: '请填写商品服务名称！'
							});
							return;
						}
						if(_self.pattern[_self.patternIndex].shoppingCode == "0"){
							uni.showToast({
								icon: 'none',
								title: '请选择购物方式！'
							});
							return;
						}
						if(_self.specification == ""){
							uni.showToast({
								icon: 'none',
								title: '请输入型号规格！'
							});
							return;
						}
						data.serviceType = _self.classifyTwo[_self.classifyTwoIndex].serviceCode;
						data.serviceName = _self.serveName;
						data.brand = _self.brand;
						data.shoppingMode = _self.pattern[_self.patternIndex].shoppingCode;
						data.orderNumber = _self.orderNum;
						data.typeSpecification = _self.specification;
						data.count = _self.count;
						data.unit = _self.unit[_self.unitIndex].unitCode;
						data.amount = _self.amount;
					    data.productDate = _self.consumedate;
						data.disputeDate = _self.disputeDate
					}
					if(this.complaintDetail == ""){
						uni.showToast({
							icon: 'none',
							title: '请填写投诉内容！'
						});
						return;
					}
					
					if(_self.imgLists.length != 0){
						for (let i = 0; i < _self.imgLists.length; i++) {
							if ( _self.imgLists[i]['upload_percent'] == 0) {
								 _self.$qyc.fileRequest(
									"/ebus/tsjb/complaints/upload",
									  _self.imgLists[i].path,
									  'file',
									function(res) {
										if(i>=_self.imgLists.length-1){
											console.log(i)
											uni.showLoading({
												title: '正在提交...'
											});
											console.log(data)
											_self.$qyc.interfaceRequest(
												"/ebus/tsjb/complaints/addcomplaintinformation", data,
												function(res) {
													console.log(res)
													if(res.success){
														_self.successShow = true;
														setTimeout(function(){
															uni.navigateTo({ 
																url: '/pages/myComplaint/myComplaint?certKey='+_self.certKey
															});
															var obj = _self.$options.data();
															obj.complaintObject = _self.complaintObject;
															Object.assign(_self.$data, obj);
														},2000);
													}
													
												}
											);
										}
									}
								 );
							   }
						}
					}
				}
				
			},
		},
		components: {
			mpvuePicker,
			graceMaskView,
			jsfunRecord
		}
	}
</script>
<style>
	page{background: #F8F9FC;}
	.cpl-rpt-choose-radio{
		background: #fff;
		margin-top:20upx ;
		padding:20upx 0;
	}
	.cpl-rpt-choose-radio label{
		margin-left: 30upx;
	}
	.grace-padding{padding:0;width: 750upx;}
	
	.target{margin-top:20upx;background:#fff;padding:0 30upx;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.target-list{border-bottom:1px solid rgba(214,214,214,0.50);padding:20upx 0;}
	.target-list:last-child{border:none;}
	.target-list .target-list-title{opacity: 0.5;font-size:28upx;color: #000000;text-align: justify;line-height: 52upx;}
	.target-list .target-list-text{opacity: 0.8;font-size: 28upx;color: #000000;text-align: right;line-height: 52upx;width:55%;}
	.target-info{margin-top:20upx;padding:0 30upx;background:#fff;box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.target-info .grace-items{padding:0;}
	.input-right{line-height: 100upx;height:100upx;font-size:28upx;color: #000000;opacity: 0.8;}
	.grace-form picker{height:100upx;line-height:100upx;}
	.grace-form-r{padding:0;line-height: 100upx;color: #000000;opacity: 0.8;}
	.grace-form .grace-items picker text,.grace-form .grace-items .input{font-size:28upx;color: #000000;opacity: 0.8;}
	.target-info .grace-items .grace-label{width:200upx;}
	.target-info .grace-items .grace-label text{opacity: 0.5;font-size:28upx;color: #000000;}
	.target-info .grace-items .grace-label text.col-red{font-size:30upx;color: #F0474A;opacity: 1 !important;}
	.suggest{margin-top:20upx;background:#fff;padding:10upx 30upx;padding-bottom:50upx; box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.suggest-list{line-height: 64upx;padding:15upx 0;}
	.suggest-list text{opacity: 0.5;font-size: 28upx;color: #000000;}
	.suggest-list text.col-red{font-size:30upx;color: #F0474A;opacity: 1 !important;}
	.suggest-list image{width:64upx;height:64upx;}
	.suggest-textarea textarea{background: #F8F8F8;border: 2upx solid #D6D6D6;border-radius: 4px;height:160upx;width: 96%;padding:20upx 2%;font-size: 28upx;color:#000;opacity: 0.8;}
	/* upload */
	.upload{margin-top:20upx;background:#fff;padding:10upx 0; box-shadow: 0 1px 0 0 rgba(214,214,214,0.50), 0 2px 14px 0 rgba(9,63,127,0.05);}
	.upload .grace-wrap {padding:10upx 60upx;}
	.upload .grace-wrap .grace-boxes{width:31.33%;}
	.upload .grace-wrap .grace-boxes image{width:120upx;height:120upx;}
	.upload .grace-wrap .grace-boxes .grace-boxes-text{font-size: 28upx;color: #4C4C4C;}
	.grace-add-file{padding:15upx;width:720upx;}
	.grace-add-file .garce-items{margin:15upx;width:150upx;height:150upx;overflow: visible;}
	.grace-add-file .garce-items .file-box{width:150upx;height:150upx;position: relative;overflow: hidden;background:#3691B7;}
	.grace-add-file .garce-items .file-box .file-bf{position: absolute;top:50%;left:50%;width:64upx;height:64upx;margin-left:-32upx;margin-top:-32upx;}
	.grace-add-file .garce-items .file-image{width:100%;height:100%;}
	.grace-add-file .garce-items video,.grace-add-file .garce-items audio{width:100%;height:100%;opacity: 0;}
	.grace-add-file .garce-items .file-close{right:-24upx;top:-24upx;position: absolute;width:48upx;height:48upx;}
	.target-btn{margin:80upx 30upx;}
	.target-btn button{background: #3691B7;border-radius: 8upx;color:#fff;height:88upx;line-height: 88upx;font-size: 36upx;}
	.target-btn button:active{background: #3691B7;color:#fff;}
	/* pop */
	.pop-detail{padding:30upx;display: flex;}
	.pop-detail>view{width:100%;}
	.pop-detail image{width:72upx;height:72upx;margin:0 auto;display:flex;margin-bottom:15upx;}
	.pop-detail .pop-title{font-size: 36upx;color: #000000;font-weight: bold;text-align: center;margin-bottom:20upx;}
	.pop-detail .pop-title.success{color: #3DA846;}
	.pop-detail .pop-title.danger{color: #F0474A;}
	.pop-detail .pop-text{opacity: 0.5;font-size: 24upx;color: #000000;text-align: center;line-height:48upx;}
	.pop-detail .pop-text text{display: block;}
	.pop-detail .pop-text text.danger{color: #F0474A;}
	.tape-detail{display: flex;padding:30upx 0;}
	.tape-detail>view{width:100%;}
</style>
