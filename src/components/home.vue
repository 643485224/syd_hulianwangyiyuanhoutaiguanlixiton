<template>
	<div class="layout">
		<Layout>
			<Header :style="{ height: '7%' }">
				<Menu mode="horizontal" theme="dark">
					<div class="layout-logo"></div>
					<div class="layout-nav">
						<MenuItem name="3">
						<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
						超级管理员
						<Icon type="ios-log-out" />
						</MenuItem>
						<MenuItem name="4">
						{{ timer }}
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Layout :style="{ height: '90%' }">
				<Sider hide-trigger :style="{ background: '#fff' }">
					<Menu active-name="1-2" theme="dark" width="auto" accordion>
						<Submenu v-for="(MenuItemData, index) in menuData" :name="index" :key="index">
							<template slot="title">
								<!-- <Icon :type="MenuItemData.icon"></Icon> -->
								{{ MenuItemData.name }}
							</template>
							<div v-if="MenuItemData.childrens">
								<template v-for="(MenuItemDataChilders, i) in MenuItemData.childrens">
									<MenuItem :name="index + i"
										@click.native="checkerTo(MenuItemDataChilders, MenuItemData)"><span>{{
												MenuItemDataChilders.name
										}}</span></MenuItem>
								</template>
							</div>
						</Submenu>
					</Menu>
				</Sider>
				<Layout :style="{ padding: '0 24px 24px' }">
					<Breadcrumb :style="{ margin: '24px 0' }">
						<BreadcrumbItem v-for="(item, index) in options" :key="index">{{ item.name }}</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{ padding: '24px', background: '#fff' }">
						<router-view v-wechat-title="$route.meta.title"></router-view>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>
<script>
import {GetCurrentTime} from "./common"
export default {
	data() {
		return {
			menuData: [
				{
					name: "医院管理",
					childrens: [
						{
							name: "医院管理",
							address: "hospital",
						},
					],
				},
				{
					name: "科室管理",
					childrens: [
						{
							name: "科室管理",
							address: "departmentInfo",
						},
					],
				},
				{
					name: "医生管理",
					childrens: [
						{
							name: "医生管理",
							address: "DoctorInfo",
						},
					],
				},
				{
					name: "门诊服务",
					childrens: [
						{
							name: "当日挂号管理",
							address: "RegisterBusiness",
						},
						{
							name: "预约挂号管理",
							address: "SubscribeBusiness",
						},
						// {
						// 	name: "余额充值管理",
						// 	address: "vacanciesPay",
						// },
						// {
						// 	name: "缴费管理",
						// 	address: "OutpaitentPay",
						// },
						{
							name: "核酸管理",
							address: "nuclein",
						},
						{
							name: "体检管理",
							address: "RegisterBusiness",
						},
					],
				},
				{
					name: "退费管理",
					childrens: [
						{
							name: "住院充值查询",
							address: "hospitalizationPay",
						},
						{
							name: "住院退款查询",
							address: "hospitalizationRefund",
						},
						{
							name: "门诊充值查询",
							address: "outpaitentPayFun",
						},
						{
							name: "门诊退款查询",
							address: "outpaitentRefund",
						},
					],
				},
				{
					name: "统计分析",
					childrens: [
						{
							name: "门诊统计",
							address: "department",
						},
						{
							name: "快速问诊统计",
							address: "RegisterBusiness",
						},
					],
				},
				{
					name: "住院管理",
					childrens: [
						{
							name: "住院预充值管理",
							address: "hospitalPreCharge",
						},
						{
							name: "住院记录",
							address: "hospitalizationRecords",
						},
						{
							name: "住院清单",
							address: "inpatientList",
						},
					],
				},
				{
					name: "个人中心",
					childrens: [
						{
							name: "用户管理",
							address: "userManagement",
						},
						{
							name: "就诊卡管理",
							address: "visitCardManagement",
						},
						{
							name: "我的关注",
							address: "RegisterBusiness",
						},
					],
				},
				{
					name: "系统管理",
					childrens: [
						{
							name: "平台用户",
							address: "department",
						},
						{
							name: "角色管理",
							address: "RegisterBusiness",
						},
						{
							name: "权限管理",
							address: "RegisterBusiness",
						},
					],
				},
			],
			options: [],
			timer: "",
		};
	},
	mounted() {
		this.timer =GetCurrentTime(5,0,'-').date+GetCurrentTime(5,0,'-').week
	},
	methods: {
		checkerTo(param, param2) {
			if (param2.name == "医院管理") {
				let pathTo = "/home/" + param.address;
				this.$router.push(pathTo);
			} else {
				let pathTo = "/home/choosehospital";
				this.$router.push({ path: pathTo, query: { data1: param } });
			}
		},
		getRouter() {
			let matched = this.$route.matched;
			if (matched[1].meta.title !== "首页") {
				matched = [{ path: "/home", name: "首页", mate: { title: "首页" } }].concat(matched);
			}
			matched.splice(1, 1);
			this.options = matched;
			console.log(this.options);
		},
	},
	watch: {
		$route() {
			this.getRouter();
		},
	},
};
</script>
<style scoped>
.ivu-layout-header {
	padding: 0;
}

.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	position: relative;
	overflow-x: hidden;
	width: 100vw;
	height: 100vh;
}

.ivu-layout {
	height: 100%;
	width: 100%;
}

.ivu-layout-sider {
	background: #515a6e !important;
	overflow: auto;
}

::-webkit-scrollbar {
	width: 1px;
}

.layout-logo {
	width: 200px;
	height: 64px;
	background: #5b6270;
	float: left;
	position: relative;
}

.layout-nav {
	width: 420px;
	margin: 0 auto;
	margin-right: 20px;
}

.ivu-menu-horizontal .ivu-menu-item {
	float: right;
}

.ivu-layout-content {
	overflow: auto;
}
</style>
