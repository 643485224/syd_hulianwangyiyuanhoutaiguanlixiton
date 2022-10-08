<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"></router-view>
	</div>
</template>

<script>
//import login from './components/login.vue'
import {getCookie} from  "./utils/cookies"
export default {
	name: "App",
	components: {
		//login
	},
	mounted() {
    if(getCookie('tokenId')){
      this.$router.push("/home");
    }else{
      this.$router.push("/");
    }
		// this.$router.push("/home");
	},
};
</script>

<style>
html,
body {
	width: 100%;
	height: 100%;
	min-width: 1280px;
}
#app {
	width: 100%;
	height: 100%;
}
.addForm form {
	width: 500px;
}
</style>
