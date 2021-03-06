/*
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-17 18:33:40
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-05 21:19:52
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' // 引入全局样式
import './assets/font/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios // 挂载axios
axios.defaults.baseURL = "http://localhost:9000/" // 后端项目路径


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
