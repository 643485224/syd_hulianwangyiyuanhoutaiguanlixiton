<template>
	<!-- 住院管理-住院清单页 -->
	<div ref="contentBox" class="contentBox">
		住院清单
		<!-- <div v-show="isShow">
			<Spin fix v-show="isSpan" style="z-index: 999"
				><Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
				<div>{{ spinTitle }}</div></Spin
			>
			<Button class="ButtonClass" type="primary" icon="md-add" @click="addUserButton()">新增</Button>
			<Table stripe :columns="tableTitle" :data="tableData" :height="tableHeight">
				<template slot-scope="{ row }" slot="operation">
					<div class="flex">
						<Button type="primary" class="editClass" @click="editUserButton(row)">修改</Button>
						<Poptip :transfer="true" confirm title="确认删除这条用户信息吗?" @on-ok="deleteUserButton(row)">
							<Button type="primary" class="deleteClass">删除</Button>
						</Poptip>
					</div>
				</template>
				<template slot-scope="{ row }" slot="patientSex">
					<span v-if="row.patientSex == 1">男</span>
					<span v-if="row.patientSex == 2">女</span>
				</template>
				<template slot-scope="{ row }" slot="iddefault">
					<span v-if="row.iddefault == 0">否</span>
					<span v-if="row.iddefault == 1">默认</span>
				</template>
			</Table>
			<div class="PageClass">
				<Page :total="total" :current="page" :page-size="limit" @on-change="chagesPage($event)" @on-page-size-change="chagesPageSize($event)" show-sizer />
			</div>
		</div>
		<div v-show="!isShow">
			<h3 class="operationTitle">{{ operationTitle }}</h3>
			<Form ref="formValidate" :model="formUserItem" :label-width="80" :rules="rulesList">
				<FormItem label="姓名" prop="name">
					<Input class="formInputClass" v-model="formUserItem.name" placeholder="请输入用户姓名"></Input>
				</FormItem>
				<FormItem label="手机号" prop="phone">
					<Input class="formInputClass" v-model="formUserItem.phone" placeholder="请输入手机号"></Input>
				</FormItem>
				<FormItem label="证件类型" prop="cardtype">
					<Input class="formInputClass" v-model="formUserItem.cardtype" placeholder="请输入证件类型"></Input>
				</FormItem>
				<FormItem label="医院名称" prop="hispitalname">
					<Select class="formInputClass" v-model="formUserItem.hispitalname" placeholder="请输入医院名称">
						<Option v-for="item in hospitalList" :key="item.hospitalName" :value="item.hospitalName" :label="item.hospitalName"></Option>
					</Select>
				</FormItem>
				<FormItem label="证件号码" prop="cardno">
					<Input class="formInputClass" v-model="formUserItem.cardno" placeholder="请输入证件号码"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
					<Button style="margin-left: 8px" @click="handleReset()">返回</Button>
				</FormItem>
			</Form>
		</div> -->
	</div>
</template>
<script>
import { hospitalInfo, queryAllVisitCard, addUserAccount, updateUserAccount, deleteUserAccount } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js";
export default {
	data() {
		return {
			tableHeight: 0, //表格高度
			tableTitle: [
				{
					title: "序号",
					type: "index",
					align: "center",
					width: 80,
				},
				{
					title: "就诊卡id",
					key: "id",
					align: "center",
					minWidth: 120,
				},

				{
					title: "用户id",
					key: "useraccountid",
					align: "center",
					minWidth: 120,
				},
				{
					title: "就诊卡卡号",
					key: "hisCardNo",
					align: "center",
					minWidth: 180,
				},
				{
					title: "医院名称",
					key: "hispitalname",
					align: "center",
					minWidth: 180,
				},
				{
					title: "患者姓名",
					key: "patientName",
					align: "center",
					minWidth: 120,
				},
				{
					title: "性别",
					slot: "patientSex",
					align: "center",
					minWidth: 80,
				},
				{
					title: "年龄",
					key: "patientAge",
					align: "center",
					minWidth: 80,
				},
				{
					title: "与账户关系",
					key: "accountrelation",
					align: "center",
					minWidth: 120,
				},
				{
					title: "证件类型",
					key: "hisCardType",
					align: "center",
					minWidth: 120,
				},
				{
					title: "证件号码",
					key: "idCardNo",
					align: "center",
					minWidth: 180,
				},
				{
					title: "账号余额",
					key: "balance",
					align: "center",
					minWidth: 120,
				},

				{
					title: "用户手机号",
					key: "patientPhone",
					align: "center",
					minWidth: 120,
				},
				{
					title: "是否默认",
					slot: "iddefault",
					align: "center",
					minWidth: 120,
				},

				{
					title: "患者id",
					key: "patientId",
					align: "center",
					minWidth: 120,
				},

				{
					title: "健康卡id",
					key: "healthcardid",
					align: "center",
					minWidth: 120,
				},
				{
					title: "健康卡二维码",
					key: "healthcardCode",
					align: "center",
					minWidth: 120,
				},
				{
					title: "创建时间",
					key: "createDate",
					align: "center",
					minWidth: 120,
				},
				{
					title: "修改时间",
					key: "modifyDate",
					align: "center",
					minWidth: 120,
				},
				{
					title: "操作",
					slot: "operation",
					align: "center",
					minWidth: 120,
				},
			],
			tableData: [],
			page: 1,
			limit: 10,
			total: 0,
			isTshi: false,
			indexInfo: 0,
			isShow: true,
			hospitalList: [], //医院名称选择器数据
			formUserItem: {
				id: "", //用户id
				createDate: "", //创建时间
				modifyDate: "", //修改时间
				openid: "", //微信openid
				name: "", //姓名
				password: "", //密码
				phone: "", //用户手机号
				cardtype: "", //证件类型
				hispitalname: "", //医院名称
				cardno: "", //证件号码
			},
			rulesList: {
				name: [{ required: true, type: "string", message: "姓名不能为空", trigger: "blur" }],
				phone: [{ required: true, type: "string", message: "手机号不能为空", trigger: "blur" }],
				cardtype: [{ required: true, type: "string", message: "证件类型不能为空", trigger: "blur" }],
				hispitalname: [{ required: true, type: "string", message: "医院名称不能为空", trigger: "change" }],
				cardno: [{ required: true, type: "string", message: "证件号码不能为空", trigger: "blur" }],
			},
			operationTitle: "新增用户", //新增用户 或 修改用户
			isSpan: false,
			spinTitle: "加载中，请稍后...",
		};
	},
	mounted() {
		window.onresize = () => {
			this.tableHeight = 0;
			this.handleHeight();
		};

		this.hospitalInfoApi();
		this.queryAllVisitCardApi();
	},
	beforeDestroy() {
		//在组件生命周期结束的时候销毁。
		window.onresize = null;
	},

	methods: {
		// 根据浏览器大小计算表格高度
		handleHeight() {
			// this.tableHeight = this.$refs.contentBox.offsetHeight - 62 - 48;
			// if (48 * this.tableData.length + 41 < this.tableHeight && this.tableData.length != 0) {
			// 	this.tableHeight = 48 * this.tableData.length + 40;
			// }
			this.tableHeight = this.$refs.contentBox.offsetHeight - 48;
			if (48 * this.tableData.length + 40 < this.tableHeight && this.tableData.length != 0) {
				this.tableHeight = 48 * this.tableData.length + 40 + 20; //20为横向滚动条高度
			}
		},
		// 医院管理-查询全部医院信息-接口
		hospitalInfoApi() {
			hospitalInfo({ page: 1, limit: 1000 }).then((res) => {
				this.hospitalList = res.data;
			});
		},
		// 用户管理-查询全部用户信息-接口
		queryAllVisitCardApi() {
			queryAllVisitCard({ id: hospitalId, page: this.page, limit: this.limit }).then((res) => {
				this.tableData = res.data;
				this.total = res.total;
				this.handleHeight(); // 根据浏览器大小计算表格高度
			});
		},
		// 用户管理-新增用户信息-接口
		addUserAccountApi() {
			this.isSpan = true;
			addUserAccount(this.formUserItem).then((res) => {
				this.isSpan = false;
				if (res.code == 200) {
					this.$Message.success(res.message);
					this.queryAllVisitCardApi();
					this.handleReset(); //表单重置
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		// 用户管理-修改用户信息-接口
		updateUserAccountApi() {
			this.isSpan = true;
			updateUserAccount(this.formUserItem).then((res) => {
				this.isSpan = false;
				if (res.code == 200) {
					this.$Message.success(res.message);
					this.queryAllVisitCardApi();
					this.handleReset(); //表单重置
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		// 用户管理-删除用户信息-接口
		deleteUserAccountApi(id) {
			this.isSpan = true;
			deleteUserAccount({ id: id }).then((res) => {
				this.isSpan = false;
				if (res.code == 200) {
					this.$Message.success(res.message);
					this.queryAllVisitCardApi();
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		// 分页-页码改变回调
		chagesPage(value) {
			this.page = value;
			this.queryAllVisitCardApi();
		},
		// 分页-页大小改变回调
		chagesPageSize(value) {
			this.page = 1;
			this.limit = value;
			this.queryAllVisitCardApi();
		},
		// 表单验证
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.operationTitle == "新增用户") {
						this.addUserAccountApi();
					} else if (this.operationTitle == "修改用户") {
						this.updateUserAccountApi();
					}
				} else {
					this.$Message.error("请完成填写再提交");
				}
			});
		},
		// 表单重置
		handleReset() {
			this.isShow = !this.isShow;
			this.formUserItem.id = ""; //用户id
			this.formUserItem.createDate = ""; //创建时间
			this.formUserItem.modifyDate = ""; //修改时间
			this.formUserItem.openid = ""; //微信openid
			this.formUserItem.name = ""; //姓名
			this.formUserItem.password = ""; //密码
			this.formUserItem.phone = ""; //用户手机号
			this.formUserItem.cardtype = ""; //证件类型
			this.formUserItem.hispitalname = ""; //医院名称
			this.formUserItem.cardno = ""; //证件号码
			this.$refs["formValidate"].resetFields();
		},
		// 新增按钮
		addUserButton() {
			this.operationTitle = "新增用户";
			this.handleReset();
		},
		// 修改按钮
		editUserButton(valueData) {
			this.operationTitle = "修改用户";
			this.formUserItem.id = valueData.id; //用户id
			this.formUserItem.createDate = valueData.createDate; //创建时间
			this.formUserItem.modifyDate = valueData.modifyDate; //修改时间
			this.formUserItem.openid = valueData.openid; //微信openid
			this.formUserItem.name = valueData.name; //姓名
			this.formUserItem.password = valueData.password; //密码
			this.formUserItem.phone = valueData.phone; //用户手机号
			this.formUserItem.cardtype = valueData.cardtype; //证件类型
			this.formUserItem.hispitalname = valueData.hispitalname; //医院名称
			this.formUserItem.cardno = valueData.cardno; //证件号码
			this.isShow = false;
		},
		// 删除按钮
		deleteUserButton(valueData) {
			this.deleteUserAccountApi(valueData.id);
		},
	},
};
</script>
<style land="scss" scoped>
/* 内容区宽高  */
.contentBox {
	height: calc(100vh - 10% - 69px - 48px - 50px);
	width: 100%;
	overflow: auto;
}
.ButtonClass {
	margin-bottom: 30px;
	text-align: center;
}
.flex {
	display: flex;
	align-items: center;
	justify-content: center;
}
.PageClass {
	margin-top: 16px;
	width: 100%;
	text-align: center;
}
.operationTitle {
	margin-bottom: 30px;
}
.formInputClass {
	width: 200px;
}
.editClass {
	background: #1dd19b;
	border-color: #1dd19b;
}
.editClass:hover {
	background: #1dd19b80;
	border-color: #1dd19b80;
}

.deleteClass {
	background: red;
	border-color: red;
	margin-left: 10px;
}
.deleteClass:hover {
	background: #ff000080;
	border-color: #ff000080;
}
.demo-spin-icon-load {
	animation: ani-demo-spin 1s linear infinite;
}
</style>
