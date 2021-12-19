/*
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-24 20:08:29
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-16 23:41:37
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import Right from '../components/admin/Rights.vue'
import Film from '../components/user/Film.vue'
import WatchList from '../components/user/WatchList.vue'

Vue.use(VueRouter)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
   role: ['admin','editor']     will control the page role (you can set multiple roles)
   title: 'title'               the name show in submenu and breadcrumb (recommend set)
   icon: 'svg-name'             the icon show in the sidebar,
   noCache: true                if fasle ,the page will no be cached(default is false)
 }
**/

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  }
  ,
  {
    path: "/404",
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router

// 异步挂载的路由

// 动态需要根据权限加载的路由表
const asyncRouterMap = [
	{
		path: '/home',
		// name: 'permissionhome',
		meta: {
			title: 'home', roles: ['超级管理员', '普通管理员', '普通用户']
		},
		component: Home,
		redirect: "/welcome",
		children: [
			{
				path: "/welcome",
				meta: {
					title: 'home', roles: ['超级管理员', '普通管理员', '普通用户']
				},
				component: Welcome,
			},
			{
				path: "/userlist",
				meta: {
					title: 'userList', roles: ['超级管理员', '普通管理员']
				},
				component: UserList,
			}
			,
			{
				path: "/rights",
				meta: {
					title: 'rights', roles: ['超级管理员', '普通管理员']
				},
				component: Right,
			}
			,
			{
				path: "/introduction",
				meta: {
					title: 'introduction', roles: ['超级管理员', '普通管理员', '普通用户']
				},
				component: Film,
			}
			,
			{
				path: "/watchlist",
				meta: {
					title: 'watchlist', roles: ['超级管理员', '普通管理员', '普通用户']
				},
				component: WatchList,
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true, component: NotFound }
]

var getRouter //用来获取后台拿到的路由
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from:从哪里访问的路径
  // next:之后要做的任务，是一个函数
  // next()放行， next('/URL')强制跳转的路径。
  
  // 访问路径为登录，直接放行
  if (to.path == '/login') next();

  // 从 session 获取登录 flag
  const flagStr = window.sessionStorage.getItem("flag");

  // 没登录去登录
  if (!flagStr) next('/login');

  next();
})

/**
 * @description 根据传入的角色，从上述的 asyncRouterMap 中筛选该角色能访问的路由
 * @param {Array} roles
 * @return {Array} 路由列表
 */
export function getRoutesOfRole(roles) {
  return filterAsyncRoutes(asyncRouterMap, roles)
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles Array of role
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles Array of role
 */
function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}