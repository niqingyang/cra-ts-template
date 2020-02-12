import React from 'react';

export interface RouteType {
    // 名称，无则不会在菜单上显示
    name?: string,
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
    [key: string]: any
}

export default [
    {
        name: 'Demo',
        path: '/demo',
        providers: [
            () => import('@/pages/Demo/Test/models/tips'),
        ],
        component: () => import('@/layouts/BasicLayout'),
        routes: [
            {
                name: 'Counter',
                path: '/demo/counter',
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
                        providers: () => import('@/pages/Demo/Test/models/tips'),
                        component: () => import('@/pages/Demo/Test'),
                    }
                ]
            }
        ]
    }
];
