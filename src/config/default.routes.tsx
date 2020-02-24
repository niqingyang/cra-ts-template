import React from 'react';
import {SmileOutlined} from '@ant-design/icons'

export interface RouteType {
    // 名称，无则不会在菜单上显示
    name?: string,
    // 图标
    icon?: string,
    locale?: string,
    authority?: string[] | string,
    // 是否在菜单中隐藏，默认 false
    hideInMenu?: boolean,
    // 是否在菜单中隐藏子项，默认 false
    hideChildrenInMenu?: boolean,
    // 访问路径，
    path: string,
    // 重定向路径
    redirect?: string,
    // 包含可以到处 default 为 Provider 的容器
    providers?: React.FC | [React.FC],
    // 组件
    component: React.FC | React.Component
    // 子路由
    routes?: RouteType[],

    // 其他任意属性
    [key: string]: any
}

export default [
    {
        path: '/',
        providers: [
            () => import('@/models/global'),
            () => import('@/models/settings'),
            () => import('@/models/user'),
            () => import('@/models/login')
        ],
        component: () => import('@/layouts/BasicLayout'),
        routes: [
            {
                name: 'Demo',
                icon: <SmileOutlined/>,
                path: '/demo',
                providers: [
                    () => import('@/pages/Demo/Test/models/tips'),
                    () => import('@/pages/Demo/MobxCounter/models'),
                ],
                routes: [
                    {
                        name: 'Counter',
                        path: '/demo/counter',
                        providers: [
                            () => import('@/pages/Demo/Counter/models')
                        ],
                        component: () => import('@/pages/Demo/Counter'),
                    },
                    {
                        name: 'Mobx Counter',
                        path: '/demo/mobx-counter',
                        component: () => import('@/pages/Demo/MobxCounter'),
                    },
                    {
                        name: 'Random User',
                        path: '/demo/random-user',
                        component: () => import('@/pages/Demo/RandomUser'),
                    },
                    {
                        name: 'Api Client',
                        path: '/demo/api-client',
                        component: () => import('@/pages/Demo/ApiClient'),
                    },
                    {
                        name: 'Test',
                        routes: [
                            {
                                name: 'Test',
                                path: '/demo/test',
                                component: () => import('@/pages/Demo/Test'),
                            }
                        ]
                    }
                ]
            },
            {
                path: '/exception/403',
                component: () => import('@/pages/Exception/403')
            },
            {
                path: '/exception/404',
                component: () => import('@/pages/Exception/404')
            },
            {
                path: '/exception/500',
                component: () => import('@/pages/Exception/500')
            }
        ]
    },
    {
        path: '/user',
        providers: [
            () => import('@/models/global'),
            () => import('@/models/settings'),
            () => import('@/models/user'),
            () => import('@/models/login')
        ],
        component: () => import('@/layouts/UserLayout'),
        routes: [
            {
                path: '/user/login',
                component: () => import('@/pages/user/login')
            }
        ]

    }
];
