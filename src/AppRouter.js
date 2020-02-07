import React from 'react';
import {Redirect, Router} from "@reach/router";
import Loadable from "react-loadable";
import invariant from "invariant";
import {Compose} from "provider-compose";

const BlankLayout = ({children}) => (<>{children}</>);

function renderRoutes(routes, defaultLoadingComponent) {
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

        route.path = route.path ? route.path : '/';

        route.loadingComponent = route.loadingComponent ? route.loadingComponent : defaultLoadingComponent;

        if (route.component) {

            if (!route.componentLoaded) {
                // 组件必须是个函数
                invariant(isFunction(route.component), `route ${route.path} component must be a function`);

                route.component = Loadable({
                    loader: route.component,
                    loading: route.loadingComponent
                });

                route.componentLoaded = true;
            }
        } else {
            route.component = BlankLayout;
        }

        const component = (
            <route.component
                key={route.key || i}
                path={route.path}
                route={route}
            >
                {renderRoutes(route.routes, defaultLoadingComponent)}
            </route.component>
        );

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

                route.providersLoaded = true;
            }

            return (
                <route.providers key={route.key || i} path='/'>
                    {component}
                </route.providers>
            )
        }

        return component;
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
