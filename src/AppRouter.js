import React from 'react';
import {Redirect, Router} from "@reach/router";
import Loadable from "react-loadable";
import invariant from "invariant";
import {Compose} from "provider-compose";

const BlankLayout = ({children}) => (<>{children}</>);

function renderRoutes(routes, defaultLoadingComponent, parentRoute) {
    return routes ? (routes.map((route, i) => {

        if (route.redirect) {
            return (
                <Redirect
                    key={route.key || i}
                    from={route.path}
                    to={route.redirect}
                />
            );
        }

        if(!route.path && !route.component){
            return renderRoutes(route.routes, defaultLoadingComponent, parentRoute);
        }

        route.path = route.path ? route.path : parentRoute.path;

        if(parentRoute && route.path.startsWith(parentRoute.path + '/')){
            route.path = route.path.substring(parentRoute.path.length + 1);
        }

        // 记录组件中使用的路径
        if (!route.componentPath) {
            route.componentPath = route.path;
        }

        // 计算绝对路径，用于菜单中使用
        if (parentRoute && !route.path.startsWith('/')) {
            route.path = parentRoute.path + '/' + route.path;
        }

        route.loadingComponent = route.loadingComponent ? route.loadingComponent : defaultLoadingComponent;

        if (route.component) {
            if (!route.componentLoaded) {
                // 组件必须是个函数
                invariant(isFunction(route.component), `route ${route.path} component must be a function`);

                route.component = Loadable({
                    loader: route.component,
                    loading: route.loadingComponent
                });
            }
        } else {
            route.component = BlankLayout;
        }

        // 标记组件已加载过
        route.componentLoaded = true;

        if (route.providers) {
            if (!route.providersLoaded) {

                if (!Array.isArray(route.providers)) {
                    route.providers = [route.providers];
                }

                route.providers = Loadable.Map({
                    loader: route.providers,
                    loading: route.loadingComponent,
                    render(loaded, props) {

                        const providers = Object.keys(loaded).filter((key) => {
                            return loaded[key].default.Provider
                        }).map((key) => {
                            return loaded[key].default.Provider
                        });

                        return (
                            <Compose providers={providers}>
                                {props.children}
                            </Compose>
                        );
                    }
                });
            }
        }else{
            route.providers = BlankLayout;
        }

        // 标记组件已加载过
        route.providersLoaded = true;

        const Component = (props) => {
            return (
                <route.providers>
                    <route.component {...props}>
                        {props.children}
                    </route.component>
                </route.providers>
            )
        }

        return (
            <Component key={route.key || i} path={`${route.componentPath}`} route={route}>
                {renderRoutes(route.routes, defaultLoadingComponent, route)}
            </Component>
        );
    })) : null;
}

function isFunction(func) {
    return typeof func === 'function';
}

function AppRouter({routes, defaultLoadingComponent}) {
    return (
        <Router>
            {renderRoutes(routes, defaultLoadingComponent)}
        </Router>
    );
}

export default AppRouter;
