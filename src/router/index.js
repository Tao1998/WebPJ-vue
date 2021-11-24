import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import Right from '../components/admin/Rights.vue'
import Film from '../components/user/Film.vue'
import Calories from '../components/user/Calories.vue'
import Food from '../components/user/Food.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome, },
      { path: "/user", component: UserList, },
	  { path: "/rights", component: Right, },
	  { path: "/introduction", component: Film, },
	  { path: "/calories", component: Calories, },
	  { path: "/food", component: Food, }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from:从哪里访问的路径
  // next:之后要做的任务，是一个函数
  //    next()放行， next('/URL')强制跳转的路径。
  if (to.path == '/login') return next();// 访问路径为登录
  // 获取flag
  const flagStr = window.sessionStorage.getItem("flag");// session取值
  if (!flagStr) return next('/login');// 没登录去登录
  next();
})

export default router

// 22222222222222222222222222222222222222222222222222222222222222


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

// export const constantRouterMap = [
// 	{
// 		path: '/',
// 		redirect: '/login',
// 		hidden: true
// 	},
// 	{
// 		path: '/login',
// 		name: '登录页面',
// 		hidden: true,
// 		component: Login
// 	},
// ]

// export default new Router({
// 	routes: constantRouterMap
// })
// // 异步挂载的路由
// // 动态需要根据权限加载的路由表
// export const asyncRouterMap = [
// 	{
// 		path: '/home',
// 		// name: 'permissionhome',
// 		meta: {
// 			title: 'home', icon: 'el-icon-setting', roles: ['超级管理员', '普通管理员', '普通用户']
// 		},
// 		component: Home,
// 		redirect: "/welcome",
// 		children: [
// 			{
// 				path: "/welcome",
// 				meta: {
// 					title: 'home', icon: 'el-icon-menu', roles: ['超级管理员', '普通管理员', '普通用户']
// 				},
// 				component: Welcome,
// 			},
// 			{
// 				path: "/user",
// 				meta: {
// 					title: 'user', icon: 'el-icon-menu', roles: ['超级管理员', '普通管理员']
// 				},
// 				component: UserList,
// 			}
// 			,
// 			{
// 				path: "/rights",
// 				meta: {
// 					title: 'rights', icon: 'el-icon-menu', roles: ['超级管理员', '普通管理员']
// 				},
// 				component: Right,
// 			}
// 			,
// 			{
// 				path: "/introduction",
// 				meta: {
// 					title: 'introduction', icon: 'el-icon-menu', roles: ['超级管理员', '普通管理员', '普通用户']
// 				},
// 				component: Film,
// 			}
// 			,
// 			{
// 				path: "/calories",
// 				meta: {
// 					title: 'calories', icon: 'el-icon-menu', roles: ['超级管理员', '普通管理员', '普通用户']
// 				},
// 				component: Calories,
// 			}
// 		]
// 	},
// 	{ path: '*', redirect: '/404', hidden: true, component: NotFound }
// ]


// // const whiteList = ['/login'] // 不重定向白名单
// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
// 	// to:将要访问的路径
// 	// from:从哪里访问的路径
// 	// next:之后要做的任务，是一个函数
// 	//    next()放行， next('/URL')强制跳转的路径。
// 	if (to.path == '/login') return next();// 访问路径为登录
// 	else {
// 		// 获取flag
// 		const flagStr = window.sessionStorage.getItem("flag");// session取值
// 		const roleStr = window.sessionStorage.getItem("role");// session取值
// 		if (!flagStr || !roleStr) return next('/login');// 没登录去登录
// 		else {
// 			const isRoleRoutes = window.sessionStorage.getItem("roleRoutes"); // 获取是否存在异步路由
// 			if (!isRoleRoutes) {
// 				const accessRoutes = getRoutesOfRole(roleStr);
// 				router.addRoutes(accessRoutes);
// 				console.log(router.getRoutes());
// 				window.sessionStorage.setItem("roleRoutes", "ok")
// 			}

// 			next();//当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
// 		}
// 	}
// })

// function getRoutesOfRole(role) {
// 	switch (role) {
// 		case "超级管理员":

// 			break;
// 		case "普通管理员":
// 			break;
// 		case "普通用户":
// 			break;

// 		default:
// 			break;
// 	}
// }
