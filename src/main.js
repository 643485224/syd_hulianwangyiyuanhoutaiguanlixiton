import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from './router'
import axios from 'axios'
import store from '@/store'
import VueWechatTitle from 'vue-wechat-title'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
// 手动引入 ECharts 各模块来减小打包体积

import {CanvasRenderer} from 'echarts/renderers'
import {BarChart} from 'echarts/charts'
import {GridComponent,TooltipComponent} from 'echarts/components'
import { PieChart } from 'echarts/charts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  PieChart
]);

// 全局注册组件（也可以使用局部注册）
Vue.component('v-chart', ECharts)

import 'iview/dist/styles/iview.css'

Vue.use(iView);
Vue.use(VueWechatTitle)


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = ECharts 

/*路由守卫*/
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

