<template>
	<!-- 个人中心-用户管理页 -->
	<div ref="contentBox" class="contentBox">
		<Table stripe :columns="tableTitle" :data="tableData" :height="tableHeight"></Table>
		<div class="PageClass">
			<Page :total="total" :current="page" :page-size="limit" @on-change="chagesPage($event)" @on-page-size-change="chagesPageSize($event)" show-sizer />
		</div>
	</div>
</template>
<script>
import { queryAllUserAccount } from "@/utils/DataInteraction";
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
					title: "用户id",
					key: "id",
					align: "center",
					minWidth: 120,
				},
				{
					title: "微信openid",
					key: "openid",
					align: "center",
					minWidth: 120,
				},
				{
					title: "医院名称",
					key: "hispitalname",
					align: "center",
					minWidth: 200,
				},
				{
					title: "姓名",
					key: "name",
					align: "center",
					minWidth: 140,
				},
				{
					title: "民族",
					key: "nation",
					align: "center",
					minWidth: 140,
				},
				{
					title: "用户手机号",
					key: "phone",
					align: "center",
					minWidth: 120,
				},
				{
					title: "证件类型",
					key: "cardtype",
					align: "center",
					minWidth: 120,
				},
				{
					title: "证件号码",
					key: "cardno",
					align: "center",
					minWidth: 160,
				},
				{
					title: "密码",
					key: "password",
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

		this.queryAllUserAccountApi();
	},
	beforeDestroy() {
		//在组件生命周期结束的时候销毁。
		window.onresize = null;
	},

	methods: {
		// 根据浏览器大小计算表格高度
		handleHeight() {
			this.tableHeight = this.$refs.contentBox.offsetHeight - 48;
			if (48 * this.tableData.length + 41 < this.tableHeight && this.tableData.length != 0) {
				this.tableHeight = 48 * this.tableData.length + 40;
			}
		},

		// 用户管理-查询全部用户信息-接口
		queryAllUserAccountApi() {
			queryAllUserAccount({ id: hospitalId, page: this.page, limit: this.limit }).then((res) => {
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
			this.queryAllUserAccountApi();
		},
		// 分页-页大小改变回调
		chagesPageSize(value) {
			this.page = 1;
			this.limit = value;
			this.queryAllUserAccountApi();
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
