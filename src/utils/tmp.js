import Layout from '@/layout'

export function tmp(name, id) {
    return [
        {
            path: `/${name}`,
            component: Layout,
            // redirect: '/foods',
            name: 'name',
            meta: {
                title: name,
                icon: 'nested'
            },
            props: { default: true, sidebar: false },
            children: [
                {
                    path: 'balance',
                    name: 'Баланс',
                    component: () => import('@/views/balance/index'),
                    meta: { title: 'Баланс', icon: 'el-icon-s-order', 'shop_id': id }
                },
                {
                    path: 'orders',
                    name: 'Замовлення',
                    component: () => import('@/views/tab/index'),
                    meta: { title: 'Замовлення', icon: 'el-icon-s-opportunity', 'shop_id': id }
                },
                {
                    path: 'foods',
                    component: () => import('@/views/table/index'),
                    name: 'foods',
                    meta: { title: 'Товари', icon: 'el-icon-s-help' },
                    children: [
                        {
                            path: 'complex-table',
                            component: () => import('@/views/table/complex-table'),
                            name: 'ComplexTable',
                            meta: { title: 'Список позиций', icon: 'table', 'shop_id': id },
                        },
                        {
                            path: 'catalog',
                            name: 'Catalog',
                            component: () => import('@/views/catalog/index'),
                            meta: { title: 'Каталог', icon: 'form', 'shop_id': id }
                        },
                    ]
                },
                // {
                //     path: 'clients',
                //     name: 'Клієнти',
                //     component: () => import('@/views/clients/index'),
                //     meta: { title: 'Клієнти', icon: 'el-icon-s-opportunity', 'shop_id': id }
                // },

                {
                    path: 'promo_stock',
                    component: () => import('@/views/table/index'),
                    name: 'promo_stock',
                    meta: { title: 'Акции ', icon: 'el-icon-s-help' },
                    children: [
                        {
                            path: 'index',
                            name: 'promo',
                            component: () => import('@/views/table/promo'),
                            meta: { title: 'Промокоди', icon: 'form', 'shop_id': id }
                        },
                        {
                            path: 'discount',
                            component: () => import('@/views/table/discount'),
                            name: 'stock',
                            meta: { title: 'Знижки', icon: 'table', 'shop_id': id }
                        },
                    ]
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
                            meta: { title: 'Оборот', noCache: true, icon: 'el-icon-goods', 'shop_id': id }
                        }
                    ]
                },
                // {
                //     path: 'drag-kanban',
                //     name: 'Sale Points',
                //     component: () => import('@/views/salepoints/drag-kanban'),
                //     meta: { title: 'Медиа (тест)', icon: 'el-icon-picture', 'shop_id': id }
                // },
                {
                    path: 'clients',
                    name: 'Клієнти',
                    component: () => import('@/views/clients/index'),
                    meta: { title: 'Клієнти', icon: 'el-icon-user', 'shop_id': id }
                },

                {
                    path: 'menu1-2',
                    component: () => import('@/views/nested/menu1/menu1-2'),
                    name: 'Menu1-2',
                    meta: { title: 'Налаштування', icon: 'el-icon-setting' },
                    children: [

                        {
                            path: 'menu1-2-1',
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                            name: 'Menu1-2-1',
                            meta: { title: 'Menu1-2-1' }
                        },
                        {
                            path: 'menu1-2-2',
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                            name: 'Menu1-2-2',
                            meta: { title: 'Menu1-2-2' }
                        }
                    ]
                },
            ]
        },
    ]

}
