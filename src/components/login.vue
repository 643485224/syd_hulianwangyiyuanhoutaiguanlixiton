<template>
	<div class="login">
		<div class="logo"><img :src="require('@/assets/login/logo.png')" /></div>
		<div class="loginForm">
			<p>欢迎登录</p>
			<span>-互联网医院后台-</span>
			<Form ref="formInline" :model="formInline" inline>
				<FormItem prop="user">
					<Input type="text" v-model="formInline.username" placeholder="请输入您的用户名">
						<Icon type="ios-person-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
				<FormItem prop="password">
					<Input type="password" v-model="formInline.password" placeholder="请输入您的密码">
						<Icon type="ios-lock-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
				<FormItem>
					<Checkbox v-model="checkbox" @on-change="remberPass">记住密码</Checkbox>
				</FormItem>
				<br />
				<FormItem>
					<Button type="primary" @click="loginTo">登录</Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>
<script>
import { login } from "../utils/DataInteraction";
import { setAdmin, removeAdmin, getAdmin2 } from "../utils/admin";
import { setCookie } from "../utils/cookies";
export default {
	data() {
		return {
			formInline: {
				username: "",
				password: "",
			},
			checkbox: false,
		};
	},
	methods: {
		loginTo() {
			const loginUrl = {
				username: this.formInline.username,
				password: this.formInline.password,
			};
			login({
				username: this.formInline.username,
				password: this.formInline.password,
			}).then((res) => {
				console.log(res.tokenId);
				setCookie("tokenId", res.tokenId, 3);
				this.$router.push("/home");
			});
		},
		remberPass() {
			if (this.checkbox) {
				setAdmin(localStorage, "username", this.formInline.username);
				setAdmin(localStorage, "password", this.formInline.password);
			} else {
				removeAdmin(localStorage, "username");
				removeAdmin(localStorage, "password");
			}
		},
	},
	mounted() {
		console.log(getAdmin2(localStorage, "username"));
		this.formInline.username = getAdmin2(localStorage, "username");
		this.formInline.password = getAdmin2(localStorage, "password");
		this.checkbox = true;
	},
	created() {},
};
</script>

<style scoped>

.login {
	width: 100vw;
	height: 100vh;
	background: url(~@/assets/login/bg.png) no-repeat;
	background-size: 100% auto;
	position: relative;
}
.logo {
	position: absolute;
	left: 280px;
	top: 40px;
	width: 382px;
}
.logo img {
	width: 100%;
	height: auto;
}
.loginForm {
	width: 400px;
	height: 350px;
	background: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
	padding: 30px 20px;
}
.loginForm p {
	text-align: center;
	font-size: 26px;
	color: #4061ec;
}
.loginForm span {
	display: block;
	text-align: center;
	font-size: 14px;
	color: #999999;
}
.loginForm form {
	margin-top: 30px;
}

.ivu-form-inline .ivu-form-item {
	width: 340px;
}
.ivu-btn-primary {
	background-color: #4061ec;
	width: 340px;
}
</style>
