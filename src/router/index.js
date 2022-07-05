/*
 * @Author: yuanhao
 * @Date: 2022-06-29 17:34:44
 * @LastEditTime: 2022-07-04 14:05:14
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
	return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	mode: 'history',
	routes: [
		{
			/* 首先进行重新定向操作 */
			path: '/',
			redirect: {
				name: 'index'
			}
		},
        {
            path: '/index',
			name: 'index',
			component: () => import('@/views/Index.vue'),
			children: [
				{
					path: '/table',
					name: 'table',
					meta: {
						isLogin: true,
						title: '表格'
					},
					component: () => import('@/views/table/Index.vue')
				},
				{
					path: '/form',
					name: 'form',
					meta: {
						isLogin: true,
						title: '表单'
					},
					component: () => import('@/views/form/Index.vue')
				},
				{
					path: '/searchForm',
					name: 'searchForm',
					meta: {
						isLogin: true,
						title: '查询框'
					},
					component: () => import('@/views/searchForm/Index.vue')
				}
			]
        }
	]
})