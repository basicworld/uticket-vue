import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/my-tk',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '我的工单',
        component: () => import('@/views/my-tk/index'),
        meta: { title: '我的工单', icon: 'form' }
      }
    ]
  },
  {
    path: '/my-setting',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: '个人设置',
        component: () => import('@/views/my-setting/index'),
        meta: { title: '个人设置', icon: 'form' }
      }
    ]
  },
  {
    path: '/tk-center',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '工单中心',
        component: () => import('@/views/tk-center/index'),
        meta: { title: '工单中心', icon: 'example' }
      }
    ]
  },

  {
    path: '/cus-center',
    component: Layout,
    redirect: '/cus-center/cus-man',
    name: '客户中心',
    meta: {
      title: '客户中心',
      icon: 'peoples'
    },
    children: [
      {
        path: 'cus-man',
        component: () => import('@/views/cus-center/cus-man/index'),
        name: '客户管理',
        meta: { title: '客户管理' }
      },
      {
        path: 'cmp-man',
        component: () => import('@/views/cus-center/cmp-man/index'),
        name: '公司管理',
        meta: { title: '公司管理' }
      }
    ]
  },
  {
    path: '/sys-setting',
    component: Layout,
    redirect: '/sys-setting/user-man',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'component'
    },
    children: [
      {
        path: 'user-man',
        component: () => import('@/views/sys-setting/user-man/index'),
        name: '用户管理',
        meta: { title: '用户管理' }
      },
      {
        path: 'group-man',
        component: () => import('@/views/sys-setting/group-man/index'),
        name: '用户组管理',
        meta: { title: '用户组管理' }
      },
      {
        path: 'role-man',
        component: () => import('@/views/sys-setting/role-man/index'),
        name: '角色管理',
        meta: { title: '角色管理' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
