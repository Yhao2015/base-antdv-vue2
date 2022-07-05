/*
 * @Author: yuanhao
 * @Date: 2022-05-30 11:45:27
 * @LastEditTime: 2022-07-01 20:58:54
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Moment from "moment";
import "moment/locale/zh-cn";
Moment.locale("zh-cn");

import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.less";
import '@a/less/components.less';
// import "@a/less/style.less";
Vue.use(Antd)
import jwBase from './index.js'
Vue.use(jwBase)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
