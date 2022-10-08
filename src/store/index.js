import Vuex from 'vuex'
import Vue from 'vue'

// 2.注册 Vue.use(Vuex)
// Vue.use(Vuex)->给组件添加一个$store对象
Vue.use(Vuex)

// 3.实例化store对象
const store = new Vuex.Store({

})
// 4.导出store对象
export default store