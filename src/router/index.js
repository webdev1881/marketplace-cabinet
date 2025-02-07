import Vue from "vue";
import Router from "vue-router";
// import {createWebHashHistory } from 'vue-router'

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Главная", icon: "el-icon-s-home" },
      },
    ],
  },

  // {
  //   path: "/profile",
  //   component: Layout,
  //   redirect: "/",
  //   children: [
  //     {
  //       path: "/profile",
  //       name: "Sale Points",
  //       component: () => import("@/views/profile/index"),
  //       meta: { title: "Профіль", icon: "el-icon-s-goods" },
  //     },
  //   ],
  // },

  {
    path: "/shop",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: 'orders',
        name: 'Спецификации',
        component: () => import('@/views/tab/index'),
        meta: { title: 'Спецификации', icon: 'el-icon-s-opportunity', 'shop_id': 1 }
      },
    ],
  },

  {
    path: "/complex-table",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: '/complex-table',
        component: () => import('@/views/table/complex-table'),
        name: 'ComplexTable',
        meta: { title: 'Список позиций', icon: 'table', 'shop_id': 1 },
      },
    ],
  },
  {
    path: "/catalog",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: '/catalog',
        name: 'Catalog',
        component: () => import('@/views/catalog/index'),
        meta: { title: 'Каталог', icon: 'form', 'shop_id': 1 }
      },
    ],
  },

  {
    path: 'analytics',
    component: () => import('@/views/analytics/index'),
    alwaysShow: true,
    meta: { title: 'Аналітика', icon: 'el-icon-s-data', roles: ['admin', 'editor'] },
    name: 'Аналітика',
    children: [
      {
        path: 'mix-chart',
        component: () => import('@/views/analytics/mix-chart'),
        name: 'Gain',
        meta: { title: 'Оборот', noCache: true, icon: 'el-icon-goods', 'shop_id': 1 }
      }
    ]
  },







  // {
  //   path: 'foods',
  //   component: () => import('@/views/table/index'),
  //   name: 'foods',
  //   meta: { title: 'Товари', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'complex-table',
  //       component: () => import('@/views/table/complex-table'),
  //       name: 'ComplexTable',
  //       meta: { title: 'Список позиций', icon: 'table', 'shop_id': 1 },
  //     },
  //     {
  //       path: 'catalog',
  //       name: 'Catalog',
  //       component: () => import('@/views/catalog/index'),
  //       meta: { title: 'Каталог', icon: 'form', 'shop_id': 1 }
  //     },
  //   ]
  // },





  // {
  //   path: "/name",
  //   component: Layout,
  //   name: "name",
  //   meta: { title: 'MARKET', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'balance',
  //       name: 'Баланс',
  //       component: () => import('@/views/balance/index'),
  //       meta: { title: 'Баланс', icon: 'el-icon-s-order', 'shop_id': 1 }
  //     },
  //     {
  //       path: 'orders',
  //       name: 'Замовлення',
  //       component: () => import('@/views/tab/index'),
  //       meta: { title: 'Замовлення', icon: 'el-icon-s-opportunity', 'shop_id': 1 }
  //     },
  //     {
  //       path: 'foods',
  //       component: () => import('@/views/table/index'),
  //       name: 'foods',
  //       meta: { title: 'Товари', icon: 'el-icon-s-help' },
  //       children: [
  //         {
  //           path: 'complex-table',
  //           component: () => import('@/views/table/complex-table'),
  //           name: 'ComplexTable',
  //           meta: { title: 'Список позиций', icon: 'table', 'shop_id': 1 },
  //         },
  //         {
  //           path: 'catalog',
  //           name: 'Catalog',
  //           component: () => import('@/views/catalog/index'),
  //           meta: { title: 'Каталог', icon: 'form', 'shop_id': 1 }
  //         },
  //       ]
  //     },

  //     {
  //       path: 'promo_stock',
  //       component: () => import('@/views/table/index'),
  //       name: 'promo_stock',
  //       meta: { title: 'Акции ', icon: 'el-icon-s-help' },
  //       children: [
  //         {
  //           path: 'index',
  //           name: 'promo',
  //           component: () => import('@/views/table/promo'),
  //           meta: { title: 'Промокоди', icon: 'form', 'shop_id': 1 }
  //         },
  //         {
  //           path: 'discount',
  //           component: () => import('@/views/table/discount'),
  //           name: 'stock',
  //           meta: { title: 'Знижки', icon: 'table', 'shop_id': 1 }
  //         },
  //       ]
  //     },

  //     {
  //       path: 'analytics',
  //       component: () => import('@/views/analytics/index'),
  //       alwaysShow: true,
  //       meta: { title: 'Аналітика', icon: 'el-icon-s-data', roles: ['admin', 'editor'] },
  //       name: 'Аналітика',
  //       children: [
  //         {
  //           path: 'mix-chart',
  //           component: () => import('@/views/analytics/mix-chart'),
  //           name: 'Gain',
  //           meta: { title: 'Оборот', noCache: true, icon: 'el-icon-goods', 'shop_id': 1 }
  //         }
  //       ]
  //     },

  //     {
  //       path: 'clients',
  //       name: 'Клієнти',
  //       component: () => import('@/views/clients/index'),
  //       meta: { title: 'Клієнти', icon: 'el-icon-user', 'shop_id': 1 }
  //     },

  //     {
  //       path: 'menu1-2',
  //       component: () => import('@/views/nested/menu1/menu1-2'),
  //       name: 'Menu1-2',
  //       meta: { title: 'Налаштування', icon: 'el-icon-setting' },
  //       children: [

  //         {
  //           path: 'menu1-2-1',
  //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //           name: 'Menu1-2-1',
  //           meta: { title: 'Menu1-2-1' }
  //         },
  //         {
  //           path: 'menu1-2-2',
  //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //           name: 'Menu1-2-2',
  //           meta: { title: 'Menu1-2-2' }
  //         }
  //       ]
  //     },
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
];

export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/page",
    name: "Permission",
    meta: {
      title: "Permission",
      icon: "lock",
      roles: ["admin", "editor"],
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "PagePermission",
        meta: {
          title: "Page Permission",
          roles: ["admin"],
        },
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "DirectivePermission",
        meta: {
          title: "Directive Permission",
        },
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "Role Permission",
          roles: ["admin"],
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: "history",
    // history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
