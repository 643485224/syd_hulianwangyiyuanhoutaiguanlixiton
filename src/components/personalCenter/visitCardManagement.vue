<template>
	<!-- 个人中心-就诊卡管理页 -->
	<div ref="contentBox" class="contentBox">
		<Table stripe :columns="tableTitle" :data="tableData" :height="tableHeight">
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
</template>
<script>
import { queryAllVisitCard } from "@/utils/DataInteraction";
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
			],
			tableData: [],
			page: 1,
			limit: 10,
			total: 0,
		};
	},
	mounted() {
		window.onresize = () => {
			this.tableHeight = 0;
			this.handleHeight();
		};

		this.queryAllVisitCardApi();
	},
	beforeDestroy() {
		//在组件生命周期结束的时候销毁。
		window.onresize = null;
	},

	methods: {
		// 根据浏览器大小计算表格高度
		handleHeight() {
			this.tableHeight = this.$refs.contentBox.offsetHeight - 48;
			if (48 * this.tableData.length + 40 < this.tableHeight && this.tableData.length != 0) {
				this.tableHeight = 48 * this.tableData.length + 40 + 20; //20为横向滚动条高度
			}
		},

		// 就诊卡管理-查询全部就诊卡信息-接口
		queryAllVisitCardApi() {
			queryAllVisitCard({ id: hospitalId, page: this.page, limit: this.limit }).then((res) => {
				if (res.code == 200) {
					this.tableData = res.data;
					this.total = res.total;
					this.handleHeight(); // 根据浏览器大小计算表格高度
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
/* 分页 */
.PageClass {
	margin-top: 16px;
	width: 100%;
	text-align: center;
}
</style>
