<template>
	<!-- 住院管理-住院预充值管理页面 -->
	<div ref="contentBox" class="contentBox">
		<Table stripe :columns="tableTitle" :data="tableData" :height="tableHeight">
			<template slot-scope="{ row }" slot="patientSex">
				<span v-if="row.patientSex == 1">男</span>
				<span v-else-if="row.patientSex == 2">女</span>
			</template>
			<template slot-scope="{ row }" slot="iddefault">
				<span v-if="row.iddefault == 0">否</span>
				<span v-else-if="row.iddefault == 1">默认</span>
			</template>
			<template slot-scope="{ row }" slot="payChannel">
				<span v-if="row.payChannel == '01'">微信主扫</span>
				<span v-else-if="row.payChannel == '02'">微信公众号</span>
				<span v-else-if="row.payChannel == '03'">微信小程序</span>
				<span v-else-if="row.payChannel == '04'">微信被扫</span>
				<span v-else-if="row.payChannel == '05'">微信刷脸</span>
				<span v-else-if="row.payChannel == '06'">微信App支付</span>
				<span v-else-if="row.payChannel == '21'">支付宝主扫</span>
				<span v-else-if="row.payChannel == '22'">支付宝被扫</span>
				<span v-else-if="row.payChannel == '23'">支付宝刷脸</span>
				<span v-else-if="row.payChannel == '24'">支付宝生活号</span>
				<span v-else-if="row.payChannel == '25'">支付宝app支付</span>
				<span v-else-if="row.payChannel == '41'">交通银行聚合支付</span>
				<span v-else-if="row.payChannel == '42'">农业银行聚合支付</span>
				<span v-else-if="row.payChannel == '43'">工商银行聚合支付</span>
				<span v-else-if="row.payChannel == '44'">兰州银行聚合支付</span>
				<span v-else-if="row.payChannel == '98'">云闪付</span>
				<span v-else-if="row.payChannel == '99'">银联支付</span>
				<span v-else-if="row.payChannel == '100'">现金</span>
			</template>
		</Table>
		<div class="PageClass">
			<Page :total="total" :current="page" :page-size="limit" @on-change="chagesPage($event)" @on-page-size-change="chagesPageSize($event)" show-sizer />
		</div>
	</div>
</template>
<script>
import { doPrePayInHospital } from "@/utils/DataInteraction";
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
					title: "主键id",
					key: "id",
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
					title: "住院号",
					key: "inHospitalId",
					align: "center",
					minWidth: 120,
				},
				{
					title: "卡号",
					key: "hisCardNo",
					align: "center",
					minWidth: 180,
				},
				{
					title: "卡类型",
					key: "hisCardType",
					align: "center",
					minWidth: 80,
				},
				{
					title: "金额",
					key: "amount",
					align: "center",
					minWidth: 120,
				},
				{
					title: "交易渠道",
					slot: "payChannel",
					align: "center",
					minWidth: 120,
				},
				{
					title: "交易方式",
					key: "payMethod",
					align: "center",
					minWidth: 120,
				},
				{
					title: "支付信息",
					key: "payInfo",
					align: "center",
					minWidth: 120,
				},
				{
					title: "账户",
					key: "bankNo",
					align: "center",
					minWidth: 120,
				},
				{
					title: "开户行",
					key: "openBank",
					align: "center",
					minWidth: 120,
				},
				{
					title: "订单号",
					key: "orderNo",
					align: "center",
					minWidth: 280,
				},

				{
					title: "交易时间",
					key: "payTime",
					align: "center",
					minWidth: 100,
				},
				{
					title: "创建时间",
					key: "createDate",
					align: "center",
					minWidth: 100,
				},
				{
					title: "修改时间",
					key: "modifyDate",
					align: "center",
					minWidth: 100,
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

		this.doPrePayInHospitalApi();
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
		// 住院预充值管理-住院预充值管理-接口
		doPrePayInHospitalApi() {
			doPrePayInHospital({ id: hospitalId, page: this.page, limit: this.limit }).then((res) => {
				this.tableData = res.data;
				this.total = res.total;
				this.handleHeight(); // 根据浏览器大小计算表格高度
			});
		},
		// 分页-页码改变回调
		chagesPage(value) {
			this.page = value;
			this.doPrePayInHospitalApi();
		},
		// 分页-页大小改变回调
		chagesPageSize(value) {
			this.page = 1;
			this.limit = value;
			this.doPrePayInHospitalApi();
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
.PageClass {
	margin-top: 16px;
	width: 100%;
	text-align: center;
}
</style>
